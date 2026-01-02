import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// キャッシュを強制的に無効化する
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
  const strategyEntries = generateFromFiles('strategies', 'strategies')
  const articleEntries = generateFromFiles('articles', 'article')
  
  // 3. ゲーム詳細（TSファイル）
  const gameEntries = generateFromGames()

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function generateFromFiles(folder: string, prefix: string): MetadataRoute.Sitemap {
  try {
    const fullPath = path.resolve(process.cwd(), 'contents', folder)
    if (!fs.existsSync(fullPath)) return []
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    return files.map(file => {
      const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), 'utf-8'))
      const slug = content.ogUrl?.replace(/\/$/, '').split('/').pop() || content.id?.toString() || file.replace('.json', '')
      return {
        url: `${BASE_URL}/${prefix}/${slug}`,
        lastModified: new Date(content.date || "2026-01-02"),
        changeFrequency: 'weekly',
        priority: 0.8
      }
    })
  } catch { return [] }
}

function generateFromGames(): MetadataRoute.Sitemap {
  try {
    const gamesPath = path.resolve(process.cwd(), 'data', 'games')
    if (!fs.existsSync(gamesPath)) return []
    const files = fs.readdirSync(gamesPath).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index'))
    return files.map(file => {
      const slug = file.replace(/\.tsx?$/, '')
      return {
        url: `${BASE_URL}/games/${slug}`,
        lastModified: new Date("2026-01-02"),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    })
  } catch { return [] }
}