import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// キャッシュを無効化し、リクエストごとに生成を強制する
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
    // 【重要】もし contents がプロジェクト直下でない場合、ここを調整する必要があります。
    // プロジェクトルート/contents の場合はこれでOK。
    // もし /src/contents なら path.join(process.cwd(), 'src', 'contents', folderPath)
    const fullPath = path.join(process.cwd(), 'contents', folderPath)
    
    // パスが通っているかビルドログで確認するためのデバッグ（Vercelのログに出ます）
    if (!fs.existsSync(fullPath)) {
      console.error(`Sitemap error: Path not found -> ${fullPath}`)
      return []
    }

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const filePath = path.join(fullPath, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      let slug = ""
      // ogUrlからスラッグを抽出
      if (content.ogUrl && typeof content.ogUrl === 'string') {
        const cleanUrl = content.ogUrl.replace(/\/$/, '')
        const parts = cleanUrl.split('/')
        slug = parts[parts.length - 1]
      }
      
      // slugが空、またはIDと同一でないかチェック
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