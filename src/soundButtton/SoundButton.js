import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
export default function VideoButton({ videoSrc }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const handlePlay = () => {
        if (videoRef.current) {
            if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
            }
            else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
    };
    return (_jsxs("div", { children: [_jsx("video", { ref: videoRef, src: videoSrc, width: "480", controls: false, style: { display: "block", marginBottom: "1rem" } }), _jsx("button", { onClick: handlePlay, children: isPlaying ? "Остановить видео" : "Запустить видео" })] }));
}
