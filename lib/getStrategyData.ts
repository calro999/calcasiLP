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
  slug?: string; // ← 追加
};

export function getAllStrategies(): Strategy[] {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");
  const fileNames = fs.readdirSync(strategiesDir);

  const strategies: Strategy[] = fileNames
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(strategiesDir, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const strategy: Strategy = JSON.parse(fileContents);
      const id = path.parse(file).name; // ファイル名から ID を取得
      return {
        ...strategy,
        slug: `/strategies/${id}`,
      };
    });

  return strategies;
}

export function getStrategyById(id: string): Strategy | null {
  const filePath = path.join(process.cwd(), "contents", "strategies", `${id}.json`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const strategy: Strategy = JSON.parse(fileContents);
  return strategy;
}
