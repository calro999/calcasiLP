"use client";

import { useEffect, useRef, useState } from "react";

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
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/videos.json");
      const data: VideoItem[] = await res.json();
      setVideos(data);
    }
    loadVideos();
  }, []);

  // ===== X(Twitter) 正式な再描画処理 =====
  useEffect(() => {
    const scriptId = "twitter-wjs";

    const loadTimeline = () => {
      // @ts-ignore
      if (window.twttr && twitterRef.current) {
        // @ts-ignore
        window.twttr.widgets.load(twitterRef.current);
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = loadTimeline;
      document.body.appendChild(script);
    } else {
      loadTimeline();
    }
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
            <div className="video-player-area">
              <div className="player-box">{renderVideo(video.url)}</div>
            </div>

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

      {/* ===== X(Twitter) ===== */}
      <div className="twitter-section">
        <h2 className="twitter-title">最新のX投稿</h2>

        <div className="twitter-scroll-box" ref={twitterRef}>
          <a
            className="twitter-timeline"
            href="https://x.com/calro_shorts"
            target="_blank"
            rel="noopener noreferrer"
            data-theme="dark"
            data-chrome="noheader nofooter transparent"
            data-tweet-limit="20"
          >
            Tweets by calro_shorts
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
        }

        .videos {
          display: flex;
          flex-direction: column;
          gap: 70px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-item-row {
          display: flex;
          flex-direction: column;
          gap: 30px;
          background: #111;
          border-radius: 14px;
          padding: 20px;
        }

        .player-box {
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }

        .videoTitle {
          color: #67e8f9;
          margin-bottom: 10px;
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
          max-width: 100%;
          max-height: 120px;
          border-radius: 8px;
        }

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
          background: #111;
          border-radius: 14px;
          padding: 10px;
        }

        .twitter-scroll-box iframe {
          min-height: 600px;
        }

        @media (min-width: 768px) {
          .video-item-row {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}
