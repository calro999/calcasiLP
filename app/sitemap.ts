import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// 常に最新の状態を生成するための設定
export const revalidate = 0
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 固定ルート
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

  // 2. 動的記事の取得
  const strategyEntries = generateEntries('strategies', 'strategies')
  const articleEntries = generateEntries('articles', 'article')
  
  // 【追加】動画個別ページの取得
  // contents/videos フォルダが存在することを想定しています
  const videoEntries = generateEntries('videos', 'videos')

  return [...staticPages, ...strategyEntries, ...articleEntries, ...videoEntries]
}

function generateEntries(folderName: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'contents', folderName)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`[Sitemap] Directory missing: ${fullPath}`)
      return []
    }

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const filePath = path.join(fullPath, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      let slug = ""
      if (content.ogUrl && typeof content.ogUrl === 'string') {
        const cleanUrl = content.ogUrl.replace(/\/$/, '')
        const parts = cleanUrl.split('/')
        slug = parts[parts.length - 1]
      }
      
      // Slug優先 -> content.id優先 -> ファイル名
      const finalSlug = slug || content.id?.toString() || file.replace('.json', '')

      return {
        url: `${BASE_URL}/${routePrefix}/${finalSlug}`,
        lastModified: content.date ? new Date(content.date) : new Date("2026-01-02"),
        changeFrequency: 'weekly' as const,
        priority: 0.8
      }
    })
  } catch (error) {
    console.error(`[Sitemap] Error in ${folderName}:`, error)
    return []
  }
}