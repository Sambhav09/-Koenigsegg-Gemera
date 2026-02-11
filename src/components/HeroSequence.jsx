import { useEffect, useRef, useState } from "react";
import React from "react";

const TOTAL_FRAMES = 40;
const IMAGE_PATH = "/images/sequence";

const HeroSequence = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

    const getFrameSrc = (index) => {
        const frameNumber = String(index + 1).padStart(3, "0");
        return `${IMAGE_PATH}/ezgif-frame-${frameNumber}.jpg`;
    };

    // 1. PRIORITY LOAD: Just the first frame
    useEffect(() => {
        const img = new Image();
        img.src = getFrameSrc(0);
        img.onload = () => {
            imagesRef.current[0] = img;
            setFirstFrameLoaded(true);
            renderFrame(0);
            // Once the first frame is visible, load the rest quietly
            loadRemainingFrames();
        };
    }, []);

    // 2. BACKGROUND LOAD: Load the rest without blocking the UI
    const loadRemainingFrames = () => {
        for (let i = 1; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                imagesRef.current[i] = img;
            };
        }
    };

    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        // Find the closest loaded frame to avoid "flicker" if a frame isn't ready
        let img = imagesRef.current[index];
        if (!img || !img.complete) {
            // Fallback: find the nearest previous frame that IS loaded
            for (let i = index; i >= 0; i--) {
                if (imagesRef.current[i] && imagesRef.current[i].complete) {
                    img = imagesRef.current[i];
                    break;
                }
            }
        }

        if (context && img) {
            const { width, height } = canvas;
            const imgAspect = img.width / img.height;
            const canvasAspect = width / height;

            let drawW, drawH, offsetX, offsetY;
            if (canvasAspect > imgAspect) {
                drawW = width;
                drawH = width / imgAspect;
                offsetX = 0;
                offsetY = (height - drawH) / 2;
            } else {
                drawW = height * imgAspect;
                drawH = height;
                offsetX = (width - drawW) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, width, height);
            context.drawImage(img, offsetX, offsetY, drawW, drawH);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollable = containerRef.current.offsetHeight - window.innerHeight;
            const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
            const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Set initial canvas size
    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(0);
            }
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                    <h1 className={`text-6xl md:text-8xl font-light uppercase tracking-[0.3em] transition-opacity duration-1000 ${firstFrameLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        Gemera
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default HeroSequence;
