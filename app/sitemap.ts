import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/latest-news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/beginners-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/strategies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/casino-ranking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // 2. 記事（JSONファイル）
  const strategyEntries = generateEntriesFromFiles('strategies', 'strategies')
  const articleEntries = generateEntriesFromFiles('articles', 'article')
  
  // 3. ゲーム（TSファイル）
  const gameEntries = generateEntriesFromGameTs()

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function generateEntriesFromFiles(folderName: string, routePrefix: string): MetadataRoute.Sitemap {
  try {
    // process.cwd() はプロジェクトルート。その直下の contents フォルダを探す
    const fullPath = path.resolve(process.cwd(), 'contents', folderName)
    if (!fs.existsSync(fullPath)) return []

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    return files.map(file => {
      const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), 'utf-8'))
      const slug = content.ogUrl?.replace(/\/$/, '').split('/').pop() || content.id?.toString() || file.replace('.json', '')
      return {
        url: `${BASE_URL}/${routePrefix}/${slug}`,
        lastModified: new Date(content.date || "2026-01-02"),
        changeFrequency: 'weekly',
        priority: 0.8
      }
    })
  } catch { return [] }
}

function generateEntriesFromGameTs(): MetadataRoute.Sitemap {
  try {
    // ローカルパスに合わせて data/games を絶対パスで解決
    const gamesPath = path.resolve(process.cwd(), 'data', 'games')
    
    if (!fs.existsSync(gamesPath)) {
      console.warn("Games directory not found at:", gamesPath)
      return []
    }

    // .ts または .tsx ファイルを取得（index.ts は除外）
    const files = fs.readdirSync(gamesPath).filter(f => 
      (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index')
    )
    
    return files.map(file => {
      const slug = file.replace(/\.tsx?$/, '')
      return {
        url: `${BASE_URL}/games/${slug}`,
        lastModified: new Date("2026-01-02"),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    })
  } catch (err) {
    console.error("Game scan error:", err)
    return []
  }
}