import fs from "fs";
import path from "path";

export type Strategy = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  slug?: string;
  ogUrl?: string; // 追加
};

export function getAllStrategies(): Strategy[] {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");
  
  if (!fs.existsSync(strategiesDir)) return [];

  const fileNames = fs.readdirSync(strategiesDir);

  const strategies: Strategy[] = fileNames
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(strategiesDir, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const strategy: Strategy = JSON.parse(fileContents);
      
      // ogUrlの末尾をスラッグとして使用。なければファイル名(ID)
      const urlPart = strategy.ogUrl 
        ? strategy.ogUrl.split('/').filter(Boolean).pop() 
        : path.parse(file).name;

      return {
        ...strategy,
        slug: `/strategies/${urlPart}`,
      };
    });

  // 日付の降順でソート（必要であれば）
  return strategies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getStrategyById(idOrSlug: string): Strategy | null {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");
  
  // 1. まずはID（ファイル名）で直接探す
  const directPath = path.join(strategiesDir, `${idOrSlug}.json`);
  if (fs.existsSync(directPath)) {
    return JSON.parse(fs.readFileSync(directPath, "utf-8"));
  }

  // 2. 見つからない場合は全ファイルを走査してogUrlのスラッグと一致するものを探す
  const fileNames = fs.readdirSync(strategiesDir).filter(f => f.endsWith('.json'));
  for (const file of fileNames) {
    const strategy: Strategy = JSON.parse(fs.readFileSync(path.join(strategiesDir, file), "utf-8"));
    if (strategy.ogUrl && strategy.ogUrl.split('/').filter(Boolean).pop() === idOrSlug) {
      return strategy;
    }
  }

  return null;
}