import { useEffect, useState } from "react";
import Head from "next/head";

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
      return (
        <iframe
          src={`https://www.youtube.com/embed/${ytMatch[2]}`}
          style={{ width: "100%", height: "100%", border: 0 }}
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
      <Head>
        <title>【2025年最新版】動画ギャラリー｜人気カジノ動画を徹底チェック</title>
        <meta
          name="description"
          content="最新のカジノ動画をまとめた動画ギャラリーです。Golden Panda（ゴールデンパンダ）、1xBetやワンダーカジノ、デュエルビッツなどのプレイ動画や攻略情報を日本語で分かりやすく紹介しています。"
        />
        <meta name="keywords" content="カジノ動画, Golden Panda（ゴールデンパンダ）, stake, 1xBet, ワンダーカジノ, デュエルビッツ, オンラインカジノ, オンカジ, 日本語解説" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="【2025年最新版】動画ギャラリー｜人気カジノ動画を徹底チェック" />
        <meta property="og:description" content="最新のカジノ動画をまとめた動画ギャラリーです。Golden Panda（ゴールデンパンダ）、1xBetやワンダーカジノ、デュエルビッツなどのプレイ動画や攻略情報を日本語で分かりやすく紹介しています。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calcasi-lp.vercel.app/videos" />
        <meta property="og:image" content="/images/videos-og-image.jpg" />
      </Head>

      <h1 className="title">動画ギャラリー</h1>

      {/* ===== 動画 ===== */}
      <div className="videos">
        {videos.map((video) => (
          <div key={video.id} className="video-item-row">
            <div className="video-player-area">
              <div className="player-box">{renderVideo(video.url)}</div>
            </div>

            <div className="detail-area">
              <div>
                <h2 className="videoTitle">{video.title}</h2>
                <p className="description">{video.description}</p>
              </div>

              {video.bannerImage && (
                <div className="banner-wrapper">
                  <a
                    href={video.bannerLink}
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

      {/* ===== X 投稿 ===== */}
      <div className="twitter-section">
        <h2 className="twitter-title">最新のX投稿</h2>

        <div className="twitter-scroll-box">
          <div className="tweet-center">
            <iframe
              src="https://platform.twitter.com/embed/Tweet.html?id=1999061313306460668"
              loading="lazy"
            />
          </div>

          <div className="tweet-center">
            <iframe
              src="https://platform.twitter.com/embed/Tweet.html?id=1999370377307509056"
              loading="lazy"
            />
          </div>
        </div>

        <a
          href="https://x.com/calro_shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter-button"
        >
          Xで全ての投稿を見る →
        </a>
      </div>

      <style>{`
        .page {
          background: #000;
          min-height: 100vh;
          padding: 40px 20px 80px;
        }

        .title {
          text-align: center;
          color: #67e8f9;
          font-size: 36px;
          margin-bottom: 40px;
          text-shadow: 0 0 12px #00eaff;
        }

        /* ===== 動画 ===== */
        .videos {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 70px;
        }

        .video-item-row {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding: 24px;
          border-radius: 14px;
          background: #111;
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
        }

        .player-box {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 10px;
          overflow: hidden;
        }

        .videoTitle {
          color: #67e8f9;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .description {
          color: #aaa;
          white-space: pre-wrap;
        }

        .banner-wrapper {
          margin-top: 16px;
          text-align: center;
        }

        /* ★ バナーサイズを5〜10%大型化 */
        .banner-image {
          max-height: 132px; /* 元120pxの10%増し */
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
          height: 800px;
          overflow-y: auto;
          background: #111;
          border-radius: 16px;
          padding: 32px 0;
          box-shadow: 0 0 14px rgba(0,255,255,0.3);
        }

        /* ★ 完全中央揃え */
        .tweet-center {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        /* ★ 縦長・大型化 */
        .tweet-center iframe {
          width: 720px;
          height: 900px;
          max-width: 100%;
          border: none;
        }

        .twitter-button {
          display: inline-block;
          margin-top: 28px;
          padding: 14px 32px;
          font-size: 16px;
          color: #000;
          background: #67e8f9;
          border-radius: 999px;
          text-decoration: none;
          font-weight: bold;
          box-shadow: 0 0 12px rgba(103,232,249,0.9);
          transition: 0.2s ease;
        }

        .twitter-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(103,232,249,1);
        }

        @media (min-width: 768px) {
          .video-item-row {
            flex-direction: row;
          }

          .video-player-area {
            flex: 7;
          }

          .detail-area {
            flex: 3;
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
