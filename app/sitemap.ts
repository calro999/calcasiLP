// app/sitemap.ts の先頭に追加
import '../contents/strategies/parlay.json'
import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Vercelでの実行を安定させる設定
export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
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
  const strategyPath = path.join(root, 'contents', 'strategies')
  const strategyEntries = getFiles(strategyPath, 'strategies')

  // 3. articles
  const articlePath = path.join(root, 'contents', 'articles')
  const articleEntries = getFiles(articlePath, 'article')

  // 4. games
  const gamePath = path.join(root, 'data', 'games')
  const gameEntries = getGames(gamePath)

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function getFiles(dir: string, prefix: string): MetadataRoute.Sitemap {
  if (!fs.existsSync(dir)) return []
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  return files.map(file => {
    try {
      const fullPath = path.join(dir, file)
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
      const slug = content.ogUrl?.replace(/\/$/, '').split('/').pop() || content.id?.toString() || file.replace('.json', '')
      
      return {
        url: `${BASE_URL}/${prefix}/${slug}`,
        lastModified: new Date(content.date || "2026-01-02"),
        changeFrequency: 'weekly',
        priority: 0.8
      }
    } catch (e) {
      return null
    }
  }).filter((entry): entry is any => entry !== null)
}

function getGames(dir: string): MetadataRoute.Sitemap {
  if (!fs.existsSync(dir)) return []
  
  const files = fs.readdirSync(dir).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index'))
  return files.map(file => ({
    url: `${BASE_URL}/games/${file.replace(/\.tsx?$/, '')}`,
    lastModified: new Date("2026-01-02"),
    changeFrequency: 'monthly',
    priority: 0.6
  }))
}