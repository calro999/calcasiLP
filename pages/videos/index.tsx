import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string;
  description?: string; // 新規追加
  bannerImage?: string; // 新規追加
  bannerLink?: string;  // 新規追加
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    async function loadVideos() {
      // videos.json のデータ構造が変更されているため、fetch処理はそのまま
      const res = await fetch("/videos.json");
      const data: VideoItem[] = await res.json();
      setVideos(data);
    }
    loadVideos();
  }, []);

  // YouTube埋め込み機能はそのまま維持
  const renderVideo = (url: string) => {
    const ytMatch = url.match(
      /(youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/
    );
    if (ytMatch) {
      const videoId = ytMatch[2];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        playsInline
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="page">
      <h1 className="title">動画ギャラリー</h1>

      <div className="videos">
        {videos.map((video) => (
          <div key={video.id} className="video-item-row">

            {/* ===== 左：動画 (70%) ===== */}
            <div className="video-player-area">
              <div className="player-box">
                {renderVideo(video.url)}
              </div>
            </div>

            {/* ===== 右：詳細欄 (30%) ===== */}
            <div className="detail-area">
              <h2 className="videoTitle">{video.title}</h2>
              <p className="description">
                {video.description || "説明文はありません。"}
              </p>

              {/* ===== バナー ===== */}
              {video.bannerImage && (
                <div className="banner-wrapper">
                  <a
                    href={video.bannerLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.bannerImage}
                      alt="banner"
                      className="banner-image"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CSS ---------------------------- */}
      {/* ⚠️ Next.jsやReactプロジェクトの場合、<style jsx>や<style>の使い方は環境により異なります。 */}
      {/* 確実性を高めるため、今回はコンポーネント内の<style>タグにネイティブCSSを記述します。 */}
      <style>{`
        /* ページ全体 */
        .page {
          background: #000;
          min-height: 100vh;
          padding: 40px 20px;
        }

        /* タイトル（中央揃えを強制） */
        .title {
          text-align: center !important; /* 中央揃えを強制 */
          color: #67e8f9;
          font-size: 32px;
          margin-bottom: 40px;
          text-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff;
        }

        /* 動画リストコンテナ */
        .videos {
          display: flex;
          flex-direction: column;
          gap: 70px;
          align-items: center; /* 各動画行を中央寄せ */
          max-width: 1200px; /* 最大幅を設定 */
          margin: 0 auto;
        }

        /* 各動画アイテムの行コンテナ */
        .video-item-row {
          display: flex; /* Flexboxで横並びを基本とする */
          flex-direction: column; /* モバイルでは縦積み */
          width: 100%;
          max-width: 1000px; /* 行の最大幅 */
          gap: 30px; /* 動画と詳細の間の隙間 */

          /* ネオンボックススタイルを適用 */
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
          border-radius: 14px;
          background: #111;
          padding: 20px;
        }

        /* 動画プレイヤーエリア（左側 70%） */
        .video-player-area {
          flex: 1 1 100%; /* モバイルでは100%幅 */
        }

        /* 詳細エリア（右側 30%） */
        .detail-area {
          flex: 1 1 100%; /* モバイルでは100%幅 */
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* バナーを下に寄せる */
          color: #fff;
        }

        /* 動画タイトル */
        .videoTitle {
          color: #fff;
          margin-bottom: 12px;
          font-size: 20px;
          color: #67e8f9; /* ネオン色に統一 */
        }
        
        /* 動画説明文 */
        .description {
          color: #aaa;
          margin-bottom: 15px;
        }

        /* 動画ボックス */
        .player-box {
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }

        /* バナー */
        .banner-wrapper {
          margin-top: 15px;
          text-align: center;
        }
        .banner-image {
          max-height: 120px;
          max-width: 100%;
          object-fit: contain;
          border-radius: 8px;
        }


        /* ===== 768px以上での横並び（7:3比率）適用 ===== */
        @media (min-width: 768px) {
          .video-item-row {
            flex-direction: row; /* 横並び */
            padding: 30px; /* パディングを少し増やす */
          }
          .video-player-area {
            flex: 7; /* 70% */
          }
          .detail-area {
            flex: 3; /* 30% */
          }
          .title {
            font-size: 40px;
          }
        }

        @media (max-width: 600px) {
          .title {
            font-size: 26px;
          }
          .videoTitle {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}