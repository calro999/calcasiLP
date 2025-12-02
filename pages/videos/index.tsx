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
    <div className="min-h-screen w-full bg-black text-white px-4 sm:px-8 py-10 font-sans">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-14 neon-title">
        動画ギャラリー
      </h1>

      <style>{`
        body {
          background-color: #000 !important;
        }
        .neon-title {
          color: #00eaff;
          text-shadow: 0 0 6px #00eaff, 0 0 12px #00eaff, 0 0 24px #00eaff;
        }
        .neon-card {
          border: 1px solid rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .neon-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 18px rgba(0, 255, 255, 0.6);
        }
        .video-frame {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          background: #111;
          border-radius: 14px;
          overflow: hidden;
        }
      `}</style>

      <div className="space-y-14 max-w-5xl mx-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="neon-card rounded-2xl p-6 sm:p-8 bg-black/70 backdrop-blur-md"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-cyan-300">
              {video.title}
            </h2>

            <div className="video-frame">
              <video
                src={video.url}
                controls
                playsInline
                width="1920"
                height="1080"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}