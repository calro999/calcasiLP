// /lib/getAllCasinos.ts
import { casinoData } from "./casinoData";
import { Casino } from "./types";

/**
 * カジノデータを全て取得します。
 * jaフォルダ削除の方針に合わせ、lang引数はデフォルト値を設定し、
 * 現状は共通の casinoData を返すようにしています。
 */
export async function getAllCasinos(lang: "ja" | "en" = "ja"): Promise<Casino[]> {
  try {
    // 現在は外部ファイル(casinoData)からインポートしているため、そのまま返します。
    // 将来的に contents/casinos/ などのフォルダから読み込むように変更する場合、
    // ここに fs.readdir 等の処理を追加します。
    return casinoData as Casino[];
  } catch (error) {
    console.error("カジノデータの取得に失敗しました:", error);
    return [];
  }
}