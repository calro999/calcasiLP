import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
      try {
        const res = await fetch("/videos.json");
        const data: VideoItem[] = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos:", error);
      }
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
    <div className="page-root">
      <Head>
        <title>【2025年最新版】動画ギャラリー｜人気カジノ動画を徹底チェック</title>
        <meta name="description" content="最新のカジノ動画をまとめた動画ギャラリーです。" />
      </Head>

      <Header />

      <main className="content-area">
        <h1 className="title">動画ギャラリー</h1>

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
                    <a href={video.bannerLink} target="_blank" rel="noopener noreferrer">
                      <img src={video.bannerImage} alt="banner" className="banner-image" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="twitter-section">
          <h2 className="twitter-title">最新のX投稿</h2>
          <div className="twitter-scroll-box">
            <div className="tweet-center">
              <iframe
                src="https://platform.twitter.com/embed/Tweet.html?id=1999061313306460668"
                loading="lazy"
                className="x-iframe"
              />
            </div>
            <div className="tweet-center">
              <iframe
                src="https://platform.twitter.com/embed/Tweet.html?id=1999370377307509056"
                loading="lazy"
                className="x-iframe"
              />
            </div>
          </div>
          <a href="https://x.com/calro_shorts" target="_blank" rel="noopener noreferrer" className="twitter-button">
            Xで全ての投稿を見る →
          </a>
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        /* --- ページ全体のベース --- */
        .page-root {
          background-color: #000 !important;
          min-height: 100vh;
          color: #fff;
          font-family: sans-serif;
        }

        /* --- ヘッダー強制修正 --- */
        header {
          background-color: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(8px) !important;
          border-bottom: 1px solid rgba(255, 215, 0, 0.2) !important;
          position: fixed !important;
          top: 0; left: 0; right: 0; z-index: 100;
          height: auto !important;
          padding: 12px 0 !important;
        }
        header .container {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          max-width: 1200px !important;
          margin: 0 auto !important;
          padding: 0 20px !important;
        }
        header nav {
          display: flex !important;
          align-items: center !important;
          gap: 24px !important;
        }
        header a {
          color: #fff !important;
          text-decoration: none !important;
          font-size: 15px !important;
        }

        /* --- フッター強制修正 --- */
        footer {
          background-color: #0a0a0a !important;
          padding: 60px 20px !important;
          border-top: 1px solid #1e293b !important;
          margin-top: 100px !important;
        }
        footer .container {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: space-between !important;
          max-width: 1200px !important;
          margin: 0 auto !important;
          gap: 40px !important;
        }
        footer .container > div {
          flex: 1 !important;
          min-width: 200px !important;
        }
        footer h3, footer h4 {
          color: #fbbf24 !important;
          margin-bottom: 20px !important;
        }
        footer ul {
          list-style: none !important;
          padding: 0 !important;
        }
        footer li {
          margin-bottom: 10px !important;
        }
        footer a {
          color: #94a3b8 !important;
          text-decoration: none !important;
        }

        /* --- メインコンテンツ --- */
        .content-area {
          padding: 140px 20px 80px;
          max-width: 1300px;
          margin: 0 auto;
        }
        .title {
          text-align: center;
          color: #67e8f9;
          font-size: clamp(24px, 5vw, 36px);
          margin-bottom: 60px;
          text-shadow: 0 0 12px #00eaff;
          font-weight: 900;
        }

        .videos {
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
          border: 1px solid rgba(0, 255, 255, 0.3);
        }
        .player-box {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 10px;
          overflow: hidden;
        }
        .videoTitle { color: #67e8f9; font-size: 22px; margin-bottom: 12px; }
        .description { color: #cbd5e1; line-height: 1.6; font-size: 14px; }
        .banner-image { max-height: 132px; border-radius: 8px; }

        /* --- X(Twitter)修正 --- */
        .twitter-section { margin: 120px auto 0; text-align: center; }
        .twitter-scroll-box {
          height: 800px;
          overflow-y: auto;
          background: #0a0a0a;
          border-radius: 16px;
          padding: 32px 0;
          border: 1px solid rgba(103,232,249,0.2);
        }
        .x-iframe {
          width: 550px !important; /* Xの標準サイズに固定 */
          height: 800px !important;
          max-width: 100% !important;
          border: none !important;
        }
        .twitter-button {
          display: inline-block;
          margin-top: 35px;
          padding: 16px 40px;
          background: #67e8f9;
          border-radius: 999px;
          color: #000;
          font-weight: bold;
          text-decoration: none;
        }

        /* --- レスポンシブ --- */
        @media (min-width: 768px) {
          .video-item-row { flex-direction: row; }
          .video-player-area { flex: 7; }
          .detail-area { flex: 3; padding-left: 20px; text-align: left; }
        }
        @media (max-width: 768px) {
          header nav { display: none !important; }
          footer .container { flex-direction: column !important; text-align: center !important; }
        }
      `}} />
    </div>
  );
}