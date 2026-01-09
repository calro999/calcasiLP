import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// キャッシュ設定
export const revalidate = 3600 

const BASE_URL = 'https://calcasi-lp.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const root = process.cwd()

  // 1. 固定ページ（末尾にスラッシュを入れない設定で統一）
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/latest-news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/beginners-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/strategies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/casino-ranking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // 2. strategies / 3. articles / 4. games の取得
  const strategyEntries = getEntries(path.resolve(root, 'contents/strategies'), 'strategies')
  const articleEntries = getEntries(path.resolve(root, 'contents/articles'), 'article')
  const gameEntries = getGames(path.resolve(root, 'data/games'))

  const allEntries = [...staticPages, ...strategyEntries, ...articleEntries, ...gameEntries]

  // 【重要】重複排除ロジック
  // 172件ものエラーがある場合、同じURLが別のパスから生成されている可能性があります。
  const uniqueUrls = new Map();
  allEntries.forEach(entry => {
    if (!uniqueUrls.has(entry.url)) {
      uniqueUrls.set(entry.url, entry);
    }
  });

  return Array.from(uniqueUrls.values());
}

function getEntries(fullPath: string, prefix: string): MetadataRoute.Sitemap {
  try {
    if (!fs.existsSync(fullPath)) return []
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
    
    return files.map(file => {
      const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), 'utf-8'))
      
      // スラッグ取得のロジックを安定させる
      // ogUrlがある場合はそこから抽出し、なければファイル名を使用
      let slug = file.replace('.json', '');
      if (content.ogUrl) {
        const urlParts = content.ogUrl.replace(/\/$/, '').split('/');
        slug = urlParts.pop() || slug;
      } else if (content.id) {
        slug = content.id.toString();
      }

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
    // 設定ファイルや共通コンポーネントが混ざらないよう、より厳密にフィルタリング
    const files = fs.readdirSync(fullPath).filter(f => 
      (f.endsWith('.ts') || f.endsWith('.tsx')) && 
      !f.startsWith('index') && 
      !f.startsWith('_') && // _app.tsx などの除外
      !f.includes('.d.ts')   // 型定義ファイルの除外
    )
    
    return files.map(file => ({
      url: `${BASE_URL}/games/${file.replace(/\.tsx?$/, '')}`,
      lastModified: new Date("2026-01-02"),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  } catch { return [] }
}