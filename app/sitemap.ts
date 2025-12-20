// app/sitemap.ts
import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://calcasi.com'
  const strategiesDir = path.join(process.cwd(), 'contents', 'strategies')
  
  // JSONファイル一覧を取得
  const filenames = await fs.readdir(strategiesDir)
  
  const strategyEntries = await Promise.all(
    filenames
      .filter(file => file.endsWith('.json'))
      .map(async (file) => {
        const filePath = path.join(strategiesDir, file)
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'))
        
        // JSON内のogUrlからスラッグを抽出（例: https://calcasi.com/strategies/parlay -> parlay）
        // ogUrlがない場合はIDを使用
        const slug = content.ogUrl 
          ? content.ogUrl.split('/').pop() 
          : content.id.toString()

        return {
          url: `${baseUrl}/strategies/${slug}`,
          lastModified: new Date(content.date || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }
      })
  )

  // トップページなどの固定ページを追加
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...strategyEntries,
  ]
}