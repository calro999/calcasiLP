import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string;
  description?: string;
  bannerImage?: string;
  bannerLink?: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/videos.json");
      const data: VideoItem[] = await res.json();
      setVideos(data);
    }
    loadVideos();
  }, []);

  const renderVideo = (url: string) => {
    const ytMatch = url.match(
      /(youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/
    );
    if (ytMatch) {
      const videoId = ytMatch[2];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          // 修正点1: 枠（.player-box）全体に合わせるためのスタイルを適用
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        playsInline
        // 修正点1: 枠（.player-box）全体に合わせるためのスタイルを適用
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              
              {/* 修正点2: タイトルと詳細文を縦に並べるためのコンテナ */}
              <div className="details-text-wrapper"> 
                <h2 className="videoTitle">{video.title}</h2>
                <p className="description">
                  {video.description || "説明文はありません。"}
                </p>
              </div>

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

      <style>{`
        /* ページ全体 */
        .page {
          background: #000;
          min-height: 100vh;
          padding: 40px 20px;
        }

        /* タイトル（中央揃えを強制） */
        .title {
          text-align: center !important;
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
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* 各動画アイテムの行コンテナ */
        .video-item-row {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1000px;
          gap: 30px;

          /* ネオンボックススタイル */
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
          border-radius: 14px;
          background: #111;
          padding: 20px;
        }

        /* 動画プレイヤーエリア（左側 70%） */
        .video-player-area {
          flex: 1 1 100%;
        }

        /* 詳細エリア（右側 30%） */
        .detail-area {
          flex: 1 1 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* バナーを下に寄せる */
          color: #fff;
        }

        /* 修正点2: 詳細エリア内のテキストコンテナ */
        .details-text-wrapper {
          /* ここでは特にFlexboxなどは使わず、通常の縦並びにする */
        }

        /* 動画タイトル */
        .videoTitle {
          color: #fff;
          margin-bottom: 12px;
          font-size: 20px;
          color: #67e8f9;
          display: block; /* 念のためブロック要素であることを保証 */
        }
        
        /* 動画説明文 */
        .description {
          color: #aaa;
          margin-bottom: 15px;
          /* 修正点2: 横並びを解消するため、display: block; を強制 */
          display: block;
          /* 🌟 修正点: 改行文字(\n)を有効にする */
          white-space: pre-wrap;
        }

        /* 修正点1: プレイヤーの外枠 */
        .player-box {
          width: 100%;
          /* 動画プレイヤーに合わせるため、ここでは aspect-ratio を定義 */
          aspect-ratio: 16/9; 
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          position: relative; /* 内部要素の位置決めの基準 */
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
            flex-direction: row;
            padding: 30px;
          }
          .video-player-area {
            flex: 7;
          }
          .detail-area {
            flex: 3;
            /* 画面が広い場合、詳細欄のパディングを調整して文字を見やすくする */
            padding-left: 20px; 
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