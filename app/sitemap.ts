import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

function getSitemapEntries(folderPath: string, routePrefix: string) {
  // process.cwd() を使い、確実に contents フォルダを指す
  const fullPath = path.join(process.cwd(), 'contents', folderPath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`)
    return []
  }

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
  
  return files.map(file => {
    const filePath = path.join(fullPath, file)
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    // 【スラッグ解決】ogUrlの末尾を文字列スラッグとして使用
    const slug = content.ogUrl 
      ? content.ogUrl.split('/').filter(Boolean).pop().toLowerCase() 
      : content.id.toString()

    const entry: any = {
      url: `${BASE_URL}/${routePrefix}/${slug}`,
      lastModified: new Date(content.date || "2025-12-20"),
      changeFrequency: 'weekly',
      priority: 0.8,
    }

    // 【画像追加】Googleのサイトマップ拡張形式に対応
    if (content.image) {
      entry.images = [`${BASE_URL}${content.image}`]
    }

    return entry
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 'articles/ja' のように階層が深くても、フルパスで取得
  const strategyEntries = getSitemapEntries('strategies', 'strategies')
  const articleEntries = getSitemapEntries('articles/ja', 'article')

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/latest-news`,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'daily',
      priority: 0.9,
    }
  ]

  return [...staticPages, ...strategyEntries, ...articleEntries]
}