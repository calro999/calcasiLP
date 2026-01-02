import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 固定ルート（動画は一覧ページのみにする）
  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/latest-news', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/videos', priority: 0.8, changeFrequency: 'weekly' as const }, // ここが動画一覧
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

  // 2. 動的記事（contentsフォルダ）
  const strategyEntries = generateEntriesFromFiles('strategies', 'strategies')
  const articleEntries = generateEntriesFromFiles('articles', 'article')
  
  // 3. ゲームページ（data/games フォルダの .tsファイル）
  const gameEntries = generateEntriesFromGameTsFiles()

  return [
    ...staticPages, 
    ...strategyEntries, 
    ...articleEntries, 
    ...gameEntries
  ]
}

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

function generateEntriesFromGameTsFiles(): MetadataRoute.Sitemap {
  try {
    // Vercel環境でソースコード側のディレクトリを参照するための指定
    // ローカルの /Users/calro/.../data/games に対応
    const gamesPath = path.join(process.cwd(), 'data', 'games')
    
    if (!fs.existsSync(gamesPath)) {
      // もし上記で見つからない場合、Next.jsの構造によってはこちらを試す
      const altPath = path.join(process.cwd(), 'src', 'data', 'games')
      if (!fs.existsSync(altPath)) return []
      return scanTsFiles(altPath)
    }

    return scanTsFiles(gamesPath)
  } catch (error) {
    console.error("Game TS scan error:", error)
    return []
  }
}

function scanTsFiles(dirPath: string): MetadataRoute.Sitemap {
  const files = fs.readdirSync(dirPath).filter(f => 
    (f.endsWith('.ts') || f.endsWith('.tsx')) && 
    f !== 'index.ts' && 
    f !== 'index.tsx'
  )
  
  return files.map(file => {
    // 拡張子を除去してスラッグにする (apollo-pays.ts -> apollo-pays)
    const slug = file.replace(/\.tsx?$/, '')
    return {
      url: `${BASE_URL}/games/${slug}`,
      lastModified: new Date("2026-01-02"),
      changeFrequency: 'monthly',
      priority: 0.6
    }
  })
}