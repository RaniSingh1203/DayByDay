import {
  defineEventHandler,
  readMultipartFormData,
  createError
} from 'h3'
import { pool } from '~~/server/db'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400 })
  }

  const content = form.find(f => f.name === 'content')?.data?.toString()
  const images = form.filter(f => f.name === 'images')

  if (!content?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Content is required'
    })
  }

  const today = new Date().toLocaleDateString('en-CA')

  const [existing]: any = await pool.query(
    'SELECT id FROM journals WHERE user_id = ? AND created_at = ?',
    [user.id, today]
  )

  if (existing.length) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Today’s journal already exists'
    })
  }

  const [result]: any = await pool.query(
    'INSERT INTO journals (user_id, content, created_at) VALUES (?, ?, ?)',
    [user.id, content, today]
  )

  const journalId = result.insertId

  if (images.length) {
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    for (const img of images) {
      if (!img.filename) continue
      if (!img.type?.startsWith('image/')) continue

      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${img.filename}`
      await fs.promises.writeFile(
        path.join(uploadDir, fileName),
        img.data
      )

      await pool.query(
        'INSERT INTO journal_images (journal_id, image_url) VALUES (?, ?)',
        [journalId, `/uploads/${fileName}`]
      )
    }
  }

  return { success: true }
})
