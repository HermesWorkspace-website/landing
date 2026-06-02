/**
 * imagekit-adapter.ts
 * -------------------
 * Custom @payloadcms/plugin-cloud-storage adapter for ImageKit.
 * Uses the ImageKit REST API directly (no SDK dependency).
 *
 * Required env vars:
 *   IMAGEKIT_PUBLIC_KEY   – your ImageKit public key
 *   IMAGEKIT_PRIVATE_KEY  – your ImageKit private key (never exposed to client)
 *   IMAGEKIT_URL_ENDPOINT – e.g. https://ik.imagekit.io/hermesworkspace
 *   IMAGEKIT_FOLDER       – upload folder path, default: "cms"
 */

import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

// ── Helpers ─────────────────────────────────────────────────────────────────

function basicAuth(): string {
  const key = process.env.IMAGEKIT_PRIVATE_KEY ?? ''
  return 'Basic ' + Buffer.from(`${key}:`).toString('base64')
}

function urlEndpoint(): string {
  return (process.env.IMAGEKIT_URL_ENDPOINT ?? '').replace(/\/$/, '')
}

function folder(): string {
  return process.env.IMAGEKIT_FOLDER ?? 'cms'
}

/** Upload a Buffer to ImageKit, returns the fileId and url */
async function ikUpload(buffer: Buffer, fileName: string): Promise<{ fileId: string; url: string }> {
  const form = new FormData()
  form.append('file', new Blob([new Uint8Array(buffer)]), fileName)
  form.append('fileName', fileName)
  form.append('folder', `/${folder()}`)
  form.append('publicKey', process.env.IMAGEKIT_PUBLIC_KEY ?? '')
  form.append('useUniqueFileName', 'false')

  const res = await fetch('https://upload.imagekit.io/api/v2/files/upload', {
    method: 'POST',
    headers: { Authorization: basicAuth() },
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[ImageKit] Upload failed (${res.status}): ${text}`)
  }

  const json = (await res.json()) as { fileId: string; url: string }
  return { fileId: json.fileId, url: json.url }
}

/** Find a fileId by name inside the configured folder */
async function ikFindFileId(filename: string): Promise<string | null> {
  const params = new URLSearchParams({
    searchQuery: `name = "${filename}" AND folder = "/${folder()}"`,
    limit: '1',
  })

  const res = await fetch(`https://api.imagekit.io/v1/files?${params}`, {
    headers: { Authorization: basicAuth() },
  })

  if (!res.ok) return null

  const files = (await res.json()) as Array<{ fileId: string }>
  return files?.[0]?.fileId ?? null
}

/** Delete a file from ImageKit by its fileId */
async function ikDeleteFile(fileId: string): Promise<void> {
  await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: basicAuth() },
  })
}

// ── Adapter factory ──────────────────────────────────────────────────────────

export const imagekitAdapter = (): Adapter =>
  ({ collection }): GeneratedAdapter => ({
    name: 'imagekit',

    generateURL: ({ filename }) =>
      `${urlEndpoint()}/${folder()}/${filename}`,

    handleUpload: async ({ data, file }) => {
      const { fileId } = await ikUpload(file.buffer, file.filename)
      // Store the ImageKit fileId on the document for reliable deletion later
      ;(data as Record<string, unknown>).imagekitFileId = fileId
    },

    handleDelete: async ({ doc, filename }) => {
      // Prefer stored fileId; fall back to a search by name
      const fileId =
        (doc as unknown as Record<string, unknown>)?.imagekitFileId as string | undefined ??
        await ikFindFileId(filename)

      if (fileId) await ikDeleteFile(fileId)
    },

    staticHandler: async (_req, { params }) => {
      // Redirect browser requests to the ImageKit CDN URL
      const url = `${urlEndpoint()}/${folder()}/${params.filename}`
      return Response.redirect(url, 302)
    },
  })
