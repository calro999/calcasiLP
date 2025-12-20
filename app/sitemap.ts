import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 固定ページ
  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/latest-news', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/videos', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/beginners-guide', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/strategies', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/casino-ranking', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date("2025-12-20"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // 2. 動的記事（strategies）
  const strategyEntries = generateEntries('strategies', 'strategies')
  
  // 3. 動的記事（articles） ← ここから /ja を消しました
  const articleEntries = generateEntries('articles', 'article')

  return [...staticPages, ...strategyEntries, ...articleEntries]
}

function generateEntries(folderPath: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'contents', folderPath)
    
    // フォルダが存在しない場合は空配列を返す（エラーで止めない）
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory missing: ${fullPath}`)
      return []
    }

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const filePath = path.join(fullPath, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      let slug = ""
      if (content.ogUrl) {
        const parts = content.ogUrl.split('/').filter(Boolean)
        slug = parts[parts.length - 1]
      }
      
      if (!slug) {
        slug = content.id.toString()
      }

      return {
        url: `${BASE_URL}/${routePrefix}/${slug}`,
        lastModified: new Date(content.date || "2025-12-20"),
        changeFrequency: 'weekly' as const,
        priority: 0.8
      }
    })
  } catch (error) {
    console.error(`Sitemap error in ${folderPath}:`, error)
    return []
  }
}