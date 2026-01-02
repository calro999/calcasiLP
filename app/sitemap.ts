import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// キャッシュを無効化し、常に再生成
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

  // プロジェクトルートを確実に取得
  const root = process.cwd()

  // 2. 動的記事（strategies）
  const strategyEntries = generateFromDir(path.resolve(root, 'contents/strategies'), 'strategies')
  
  // 3. 動的記事（articles）
  const articleEntries = generateFromDir(path.resolve(root, 'contents/articles'), 'article')

  // 4. ゲーム詳細（data/games）
  const gameEntries = generateFromGames(path.resolve(root, 'data/games'))

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function generateFromDir(fullPath: string, prefix: string): MetadataRoute.Sitemap {
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
  } catch (e) {
    return []
  }
}

function generateFromGames(fullPath: string): MetadataRoute.Sitemap {
  try {
    if (!fs.existsSync(fullPath)) return []

    const files = fs.readdirSync(fullPath).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index'))
    return files.map(file => {
      const slug = file.replace(/\.tsx?$/, '')
      return {
        url: `${BASE_URL}/games/${slug}`,
        lastModified: new Date("2026-01-02"),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    })
  } catch (e) {
    return []
  }
}