import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

function getSitemapEntries(folderPath: string, routePrefix: string) {
  // contents フォルダの絶対パスを取得
  const fullPath = path.join(process.cwd(), 'contents', folderPath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`)
    return []
  }

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
  
  return files.map(file => {
    const filePath = path.join(fullPath, file)
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    // 【修正ポイント】
    // ogUrlから取るのではなく、URLの末尾（スラッグ）を明示的に指定、
    // もしくはファイル名やIDから生成するように統一する
    let slug = ""
    if (content.ogUrl) {
      // 例: "https://.../article/stake" -> "stake"
      slug = content.ogUrl.split('/').pop() || content.id.toString()
    } else {
      slug = content.id.toString()
    }

    return {
      url: `${BASE_URL}/${routePrefix}/${slug}`,
      lastModified: new Date(content.date || "2025-12-20"),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
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