// app/sitemap.ts
import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'

// 独自ドメインを使わないため、VercelのURLをベースに設定
const BASE_URL = 'https://calcasi-lp.vercel.app'

async function getJsonEntries(directoryName: string, routePrefix: string) {
  const dirPath = path.join(process.cwd(), 'contents', directoryName)
  try {
    const filenames = await fs.readdir(dirPath)
    return await Promise.all(
      filenames
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(dirPath, file)
          const content = JSON.parse(await fs.readFile(filePath, 'utf-8'))
          
          const slug = content.ogUrl 
            ? content.ogUrl.split('/').pop().toLowerCase() 
            : content.id.toString()

          return {
            url: `${BASE_URL}/${routePrefix}/${slug}`,
            lastModified: new Date(content.date || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          }
        })
    )
  } catch (e) {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const strategyEntries = await getJsonEntries('strategies', 'strategies')
  const newsEntries = await getJsonEntries('news', 'news')

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...strategyEntries, ...newsEntries]
}