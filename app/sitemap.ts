import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// 【重要】動的生成（force-dynamic）を削除し、ビルド時に生成させる
export const revalidate = 3600 // 1時間キャッシュ（または false）

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // process.cwd() はビルド時、プロジェクトのルートを指す
  const root = process.cwd()

  // 1. 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/latest-news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/beginners-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/strategies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/casino-ranking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // 2. strategies
  const strategyEntries = getEntries(path.resolve(root, 'contents/strategies'), 'strategies')

  // 3. articles
  const articleEntries = getEntries(path.resolve(root, 'contents/articles'), 'article')

  // 4. games
  const gameEntries = getGames(path.resolve(root, 'data/games'))

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function getEntries(fullPath: string, prefix: string): MetadataRoute.Sitemap {
  try {
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

function getGames(fullPath: string): MetadataRoute.Sitemap {
  try {
    if (!fs.existsSync(fullPath)) return []
    const files = fs.readdirSync(fullPath).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index'))
    return files.map(file => ({
      url: `${BASE_URL}/games/${file.replace(/\.tsx?$/, '')}`,
      lastModified: new Date("2026-01-02"),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  } catch { return [] }
}