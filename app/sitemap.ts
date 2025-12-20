import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

function getSitemapEntries(folderPath: string, routePrefix: string) {
  const fullPath = path.join(process.cwd(), 'contents', folderPath)
  
  if (!fs.existsSync(fullPath)) return []

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
  
  return files.map(file => {
    const filePath = path.join(fullPath, file)
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    // スラッグを抽出
    const slug = content.ogUrl 
      ? content.ogUrl.split('/').pop().toLowerCase() 
      : content.id.toString()

    return {
      url: `${BASE_URL}/${routePrefix}/${slug}`,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 各フォルダを走査
  const strategyEntries = getSitemapEntries('strategies', 'strategies')
  const articleEntries = getSitemapEntries('articles/ja', 'article')

  // 2. 固定ページ
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    }
  ]

  return [...staticPages, ...strategyEntries, ...articleEntries]
}