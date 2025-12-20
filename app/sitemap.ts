import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 固定ページ（タブ周辺）
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
  
  // 3. 動的記事（articles/ja）
  const articleEntries = generateEntries('articles/ja', 'article')

  return [...staticPages, ...strategyEntries, ...articleEntries]
}

function generateEntries(folderPath: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'contents', folderPath)
    if (!fs.existsSync(fullPath)) return []

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const filePath = path.join(fullPath, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      // スラッグ取得のロジックをより堅牢に
      let slug = ""
      if (content.ogUrl) {
        // スラッシュで分割して、空文字を除去した後の最後の要素を取得
        const parts = content.ogUrl.split('/').filter(Boolean)
        slug = parts[parts.length - 1]
      }
      
      // ogUrlがない、またはパース失敗時はIDを使用
      if (!slug) {
        slug = content.id.toString()
      }

      return {
        url: `${BASE_URL}/${routePrefix}/${slug}`,
        lastModified: new Date("2025-12-20"),
        changeFrequency: 'weekly' as const,
        priority: 0.8
      }
    })
  } catch (error) {
    console.error(`Sitemap error in ${folderPath}:`, error)
    return []
  }
}