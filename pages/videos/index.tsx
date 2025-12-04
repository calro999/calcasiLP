import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string; // YouTube URL / ID / mp4 すべて対応
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

  // ★ YouTube の URL でも ID でも mp4 でも自動判定して返す関数
  function getPlayer(videoUrl: string, title: string) {
    // mp4 判定 → <video>
    if (videoUrl.endsWith(".mp4")) {
      return (
        <video
          src={videoUrl}
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }

    // Youtube URL → ID を抽出
    let videoId = videoUrl;

    if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1];
    } else if (videoUrl.includes("watch?v=")) {
      videoId = videoUrl.split("watch?v=")[1];
    } else if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("embed/")[1];
    }

    // ID にパラメータ（?si=xxx）が含まれていたら除去
    if (videoId.includes("?")) {
      videoId = videoId.split("?")[0];
    }

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-full object-cover"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div className="bg-black min-h-screen w-full text-white px-4 sm:px-6 py-10 font-sans">
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
        /* ★ プレイヤー：大きく、YouTubeっぽく */
        .video-frame {
          width: 100%;
          max-width: 1100px; 
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          background: #111;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .video-frame {
            max-width: 100%;
            border-radius: 10px;
          }
        }
      `}</style>

      <div className="space-y-16 max-w-4xl mx-auto">
        {videos.map((video) => (
          <div key={video.id} className="neon-card rounded-2xl p-6 bg-black/70">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-cyan-300 text-center">
              {video.title}
            </h2>

            <div className="video-frame">
              {getPlayer(video.url, video.title)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
