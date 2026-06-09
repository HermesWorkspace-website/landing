import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Drop the old textarea column if it exists
  await db.execute(sql`
    ALTER TABLE "posts"
    DROP COLUMN IF EXISTS "content";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Re‑create the column as plain text (fallback) for rollback
  await db.execute(sql`
    ALTER TABLE "posts"
    ADD COLUMN "content" TEXT NOT NULL DEFAULT '';
  `);
}
