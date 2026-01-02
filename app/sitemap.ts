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

  // 2. 動的記事（JSONファイル形式）
  const strategyEntries = generateEntriesFromFiles('strategies', 'strategies')
  const articleEntries = generateEntriesFromFiles('articles', 'article')
  
  // 3. 動画ページ（一つのJSONファイルから読み込み）
  const videoEntries = generateEntriesFromVideoJson()

  // 4. ゲームページ（TSファイル名から生成）
  const gameEntries = generateEntriesFromGameTsFiles()

  return [
    ...staticPages, 
    ...strategyEntries, 
    ...articleEntries, 
    ...videoEntries, 
    ...gameEntries
  ]
}

/**
 * contentsフォルダ内の個別JSONファイルから生成
 */
function generateEntriesFromFiles(folderName: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'contents', folderName)
    if (!fs.existsSync(fullPath)) return []
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), 'utf-8'))
      let slug = ""
      if (content.ogUrl) {
        slug = content.ogUrl.replace(/\/$/, '').split('/').pop() || ""
      }
      const finalSlug = slug || content.id?.toString() || file.replace('.json', '')
      return {
        url: `${BASE_URL}/${routePrefix}/${finalSlug}`,
        lastModified: content.date ? new Date(content.date) : new Date("2026-01-02"),
        changeFrequency: 'weekly',
        priority: 0.8
      }
    })
  } catch { return [] }
}

/**
 * public/videos.json の配列データから生成
 */
function generateEntriesFromVideoJson(): MetadataRoute.Sitemap {
  try {
    const filePath = path.join(process.cwd(), 'public', 'videos.json')
    if (!fs.existsSync(filePath)) return []
    const videos = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    // videos.jsonが配列であることを想定
    return videos.map((video: any) => ({
      url: `${BASE_URL}/videos/${video.id || video.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }))
  } catch { return [] }
}

/**
 * data/games/*.ts のファイル名から生成
 */
function generateEntriesFromGameTsFiles(): MetadataRoute.Sitemap {
  try {
    const fullPath = path.join(process.cwd(), 'data', 'games')
    if (!fs.existsSync(fullPath)) return []
    
    // .ts ファイル（index.tsなどを除く）を取得
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.ts') && f !== 'index.ts')
    
    return files.map(file => {
      const slug = file.replace('.ts', '')
      return {
        url: `${BASE_URL}/games/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    })
  } catch { return [] }
}