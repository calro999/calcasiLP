import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// キャッシュを無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  // Vercel環境で確実にルートディレクトリを指すように設定
  const rootDir = process.cwd()

  // 2. strategies (prefix: strategies)
  const strategyEntries = getDynamicEntries(path.join(rootDir, 'contents/strategies'), 'strategies')

  // 3. articles (prefix: article)
  const articleEntries = getDynamicEntries(path.join(rootDir, 'contents/articles'), 'article')

  // 4. games (prefix: games)
  const gameEntries = getGameEntries(path.join(rootDir, 'data/games'))

  return [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]
}

function getDynamicEntries(fullPath: string, prefix: string): MetadataRoute.Sitemap {
  try {
    // フォルダが存在するかチェック
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory not found: ${fullPath}`)
      return []
    }

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      try {
        const raw = fs.readFileSync(path.join(fullPath, file), 'utf-8')
        const content = JSON.parse(raw)
        
        // スラッグ抽出
        let slug = ""
        if (content.ogUrl) {
          slug = content.ogUrl.replace(/\/$/, '').split('/').pop() || ""
        }
        const finalSlug = slug || content.id?.toString() || file.replace('.json', '')

        return {
          url: `${BASE_URL}/${prefix}/${finalSlug}`,
          lastModified: content.date ? new Date(content.date) : new Date("2026-01-02"),
          changeFrequency: 'weekly' as const,
          priority: 0.8
        }
      } catch (e) {
        return null
      }
    }).filter((item): item is any => item !== null)
  } catch (e) {
    return []
  }
}

function getGameEntries(fullPath: string): MetadataRoute.Sitemap {
  try {
    if (!fs.existsSync(fullPath)) return []

    const files = fs.readdirSync(fullPath).filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.startsWith('index'))
    
    return files.map(file => ({
      url: `${BASE_URL}/games/${file.replace(/\.tsx?$/, '')}`,
      lastModified: new Date("2026-01-02"),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  } catch (e) {
    return []
  }
}