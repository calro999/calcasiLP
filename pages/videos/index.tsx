import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string;
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

  return (
    <div className="video-page-bg min-h-screen w-full text-white px-4 sm:px-6 py-10 font-sans">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 neon-title">
        動画ギャラリー
      </h1>

      <style>{`
        html, body, #__next {
          background-color: #000 !important;
        }
        .neon-title {
          color: #00eaff;
          text-shadow: 0 0 6px #00eaff, 0 0 12px #00eaff, 0 0 20px #00eaff;
        }
        .neon-card {
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 10px rgba(0,255,255,0.25);
          transition: 0.25s ease;
        }
        .neon-card:hover {
          box-shadow: 0 0 16px rgba(0,255,255,0.5);
        }
        /* YouTube っぽいサイズ (16:9) */
        .video-frame {
          width: 100%;
          max-width: 960px; /* PCではゆったりしたYouTubeサイズ */
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          background: #111;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .video-frame {
            max-width: 100%; /* スマホでは画面にフィット */
            border-radius: 10px;
          }
        }
      `}</style>

      <div className="space-y-12 max-w-4xl mx-auto">
        {videos.map((video) => (
          <div key={video.id} className="neon-card rounded-2xl p-6 bg-black/70">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-cyan-300">
              {video.title}
            </h2>

            <div className="video-frame">
              <video
                src={video.url}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}