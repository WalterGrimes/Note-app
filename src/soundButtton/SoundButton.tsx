import { useState, useRef } from "react";

type VideoButtonProps = {
  videoSrc: string;
};

export default function VideoButton({ videoSrc }: VideoButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoSrc}
        width="480"
        controls={false}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <button onClick={handlePlay}>
        {isPlaying ? "Остановить видео" : "Запустить видео"}
      </button>
    </div>
  );
}
