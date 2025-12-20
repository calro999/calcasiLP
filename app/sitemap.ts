import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

function getSitemapEntries(folderPath: string, routePrefix: string) {
  const fullPath = path.join(process.cwd(), 'contents', folderPath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`)
    return []
  }

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
  
  return files.map(file => {
    const filePath = path.join(fullPath, file)
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    // スラッグ解決：ogUrlがあればその末尾、なければID
    const slug = content.ogUrl 
      ? content.ogUrl.split('/').filter(Boolean).pop().toLowerCase() 
      : content.id.toString()

    const entry: any = {
      url: `${BASE_URL}/${routePrefix}/${slug}`,
      lastModified: new Date(content.date || "2025-12-20"),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }

    // Google画像サイトマップ対応
    // content.image が "/stake.png?..." のような相対パスの場合
    if (content.image) {
      const imageUrl = content.image.startsWith('http') 
        ? content.image 
        : `${BASE_URL}${content.image}`
      entry.images = [imageUrl]
    }

    return entry
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const strategyEntries = getSitemapEntries('strategies', 'strategies')
  const articleEntries = getSitemapEntries('articles/ja', 'article')

  // 固定ページの定義（足りなかったタブ周辺を追加）
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

  return [...staticPages, ...strategyEntries, ...articleEntries]
}