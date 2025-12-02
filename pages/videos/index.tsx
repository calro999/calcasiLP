import { useEffect, useState } from "react";

// 型定義
interface VideoItem {
  id: number;
  title: string;
  url: string;
}

export default function VideosPage() {
  // 正しい型を指定
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
    <div className="min-h-screen bg-black text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-10 neon-text">動画ギャラリー</h1>

      <style>{`
        .neon-text {
          color: #0ff;
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
        }
        .neon-box {
          border: 2px solid #0ff;
          box-shadow: 0 0 15px #0ff;
        }
        .video-frame {
          width: 100%;
          max-width: 1920px;
          aspect-ratio: 16 / 9;
          background: #111;
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>

      {videos.map((video) => (
        <div key={video.id} className="neon-box p-6 rounded-2xl bg-black/80 space-y-4">
          <h2 className="text-2xl font-semibold">{video.title}</h2>

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
  );
}