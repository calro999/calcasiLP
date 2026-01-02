import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// 【重要】サイトマップを動的に生成し、キャッシュさせない設定
export const revalidate = 0
export const dynamic = 'force-dynamic'

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
  
  // 3. 動的記事（articles）
  const articleEntries = generateEntries('articles', 'article')

  return [...staticPages, ...strategyEntries, ...articleEntries]
}

function generateEntries(folderPath: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'contents', folderPath)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory missing: ${fullPath}`)
      return []
    }

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const filePath = path.join(fullPath, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      let slug = ""
      // ogUrlが存在し、かつ文字列であることを確認
      if (content.ogUrl && typeof content.ogUrl === 'string') {
        // 末尾のスラッシュを削除し、最後のパスを取得
        const cleanUrl = content.ogUrl.replace(/\/$/, '')
        const parts = cleanUrl.split('/')
        slug = parts[parts.length - 1]
      }
      
      // slugが取得できなかった場合のみIDを使用
      const finalSlug = (slug && slug !== "") ? slug : content.id.toString()

      return {
        url: `${BASE_URL}/${routePrefix}/${finalSlug}`,
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