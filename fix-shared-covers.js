import { readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
const { Client } = pg;

// Manually load .env
try {
  const envFile = readFileSync(resolve('.env'), 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/\r$/, '');
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const CONNECTION = process.env.DATABASE_URI ?? '';
const client = new Client({ connectionString: CONNECTION });

async function main() {
  await client.connect();
  console.log('Connected to database...');

  // Find all posts grouped by cover_image_id, where more than one post shares the same cover
  const sharedRes = await client.query(`
    SELECT cover_image_id, array_agg(id ORDER BY id) as post_ids
    FROM posts
    GROUP BY cover_image_id
    HAVING count(*) > 1
  `);

  console.log('Posts sharing the same cover image:');
  console.log(JSON.stringify(sharedRes.rows, null, 2));

  if (sharedRes.rows.length === 0) {
    console.log('No shared cover images found. Nothing to fix.');
    await client.end();
    return;
  }

  for (const row of sharedRes.rows) {
    const { cover_image_id, post_ids } = row;
    console.log(`\nFixing cover_image_id=${cover_image_id} shared by posts: ${post_ids.join(', ')}`);

    // Get the original media record
    const mediaRes = await client.query('SELECT * FROM media WHERE id = $1', [cover_image_id]);
    if (mediaRes.rows.length === 0) {
      console.log(`  Media record ${cover_image_id} not found, skipping.`);
      continue;
    }
    const original = mediaRes.rows[0];
    console.log(`  Original media: filename=${original.filename}, url=${original.url}`);

    // The first post keeps the original. For each subsequent post, create a duplicate media record.
    const postsToFix = post_ids.slice(1); // skip first, keep original
    for (const postId of postsToFix) {
      // Insert a duplicate media record with a new ID (exclude id, created_at, updated_at)
      const insertRes = await client.query(`
        INSERT INTO media (alt, filename, url, imagekit_file_id, updated_at, created_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING id, filename
      `, [original.alt, original.filename, original.url, original.imagekit_file_id]);

      const newMedia = insertRes.rows[0];
      console.log(`  Created duplicate media record id=${newMedia.id} for post id=${postId}`);

      // Update the post to reference the new media record
      await client.query(
        'UPDATE posts SET cover_image_id = $1 WHERE id = $2',
        [newMedia.id, postId]
      );
      console.log(`  Updated post id=${postId} to use cover_image_id=${newMedia.id}`);
    }
  }

  // Verify the fix
  console.log('\n=== Verification: Posts after fix ===');
  const verifyRes = await client.query('SELECT id, title, cover_image_id FROM posts ORDER BY id');
  console.log(JSON.stringify(verifyRes.rows, null, 2));

  await client.end();
  console.log('\nDone! All posts now have unique cover image records.');
}

main().catch(console.error);
