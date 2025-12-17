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
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  };

  return (
    <div className="page">
      <h1 className="title">動画ギャラリー</h1>

      <div className="videos">
        {videos.map((video) => (
          <div key={video.id} className="video-item-row">
            {/* 左：動画 */}
            <div className="video-player-area">
              <div className="player-box">{renderVideo(video.url)}</div>
            </div>

            {/* 右：詳細 */}
            <div className="detail-area">
              <div>
                <h2 className="videoTitle">{video.title}</h2>
                <p className="description">
                  {video.description || "説明文はありません。"}
                </p>
              </div>

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

      {/* ===== X 投稿（確実に動く iframe 方式） ===== */}
      <div className="twitter-section">
        <h2 className="twitter-title">最新のX投稿</h2>

        <div className="twitter-scroll-box">
          <iframe
            src="https://platform.twitter.com/embed/Tweet.html?screenName=calro_shorts"
            width="100%"
            height="600"
            style={{ border: "none" }}
            loading="lazy"
          />
        </div>

        <div className="twitter-link">
          <a
            href="https://x.com/calro_shorts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xで全ての投稿を見る →
          </a>
        </div>
      </div>

      <style>{`
        .page {
          background: #000;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .title {
          text-align: center;
          color: #67e8f9;
          font-size: 32px;
          margin-bottom: 40px;
          text-shadow: 0 0 10px #00eaff;
        }

        .videos {
          display: flex;
          flex-direction: column;
          gap: 70px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-item-row {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1000px;
          gap: 30px;
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
          border-radius: 14px;
          background: #111;
          padding: 20px;
        }

        .video-player-area {
          flex: 7;
        }

        .detail-area {
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
        }

        .player-box {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }

        .videoTitle {
          color: #67e8f9;
          font-size: 20px;
          margin-bottom: 12px;
        }

        .description {
          color: #aaa;
          white-space: pre-wrap;
        }

        .banner-wrapper {
          margin-top: 15px;
          text-align: center;
        }

        .banner-image {
          max-height: 120px;
          max-width: 100%;
          border-radius: 8px;
        }

        /* ===== X ===== */
        .twitter-section {
          max-width: 1000px;
          margin: 120px auto 0;
          text-align: center;
        }

        .twitter-title {
          color: #67e8f9;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .twitter-scroll-box {
          height: 600px;
          overflow-y: auto;
          border-radius: 14px;
          background: #111;
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
        }

        .twitter-link {
          margin-top: 12px;
        }

        .twitter-link a {
          color: #67e8f9;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .video-item-row {
            flex-direction: row;
          }
          .detail-area {
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
