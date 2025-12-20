import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

// JSONを解析してサイトマップのエントリーを作る関数
async function getJsonEntries(relativeDirPath: string, routePrefix: string) {
  const dirPath = path.join(process.cwd(), 'contents', relativeDirPath)
  
  try {
    const filenames = await fs.readdir(dirPath)
    return await Promise.all(
      filenames
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(dirPath, file)
          const content = JSON.parse(await fs.readFile(filePath, 'utf-8'))
          
          const slug = content.ogUrl 
            ? content.ogUrl.split('/').pop().toLowerCase() 
            : content.id.toString()

          // 画像URLの構築（/top.png などのパスを完全なURLに変換）
          const imageUrl = content.image?.startsWith('http') 
            ? content.image 
            : `${BASE_URL}${content.image}`

          return {
            url: `${BASE_URL}/${routePrefix}/${slug}`,
            lastModified: new Date("2025-12-20"),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
            // Google用の画像拡張（MetadataRoute.Sitemapの型定義によりエラーが出る場合は as any を使用）
            images: [imageUrl] 
          }
        })
    )
  } catch (e) {
    console.error(`Error loading directory ${relativeDirPath}:`, e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 各ディレクトリの取得（階層を正確に指定）
  const strategyEntries = await getJsonEntries('strategies', 'strategies')
  
  // articlesは contents/articles/ja の中にあるので 'articles/ja' と指定
  const articleEntries = await getJsonEntries('articles/ja', 'article')

  // 2. 固定ページ
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/strategies/dice`,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }
  ]

  // 全てを統合
  return [...staticPages, ...strategyEntries, ...articleEntries] as any
}