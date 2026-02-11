import { useEffect, useRef, useState } from "react";
import React from "react";

const TOTAL_FRAMES = 40;
const IMAGE_PATH = "/images/sequence";
const INITIAL_LOAD = 6;

const HeroSequence = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [loadedMap, setLoadedMap] = useState({}); // 👈 useState instead of useRef

    const getFrameSrc = (index) => {
        const frameNumber = String(index + 1).padStart(3, "0");
        return `${IMAGE_PATH}/ezgif-frame-${frameNumber}.jpg`;
    };

    const loadImage = (index) => {
        if (loadedMap[index]) return;

        const img = new Image();
        img.src = getFrameSrc(index);

        img.onload = () => {
            setLoadedMap((prev) => ({
                ...prev,
                [index]: img.src,
            }));
        };
    };

    // Preload first few frames
    useEffect(() => {
        for (let i = 0; i < INITIAL_LOAD; i++) {
            loadImage(i);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const totalHeight = containerRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollable = totalHeight - viewportHeight;

            if (scrollable <= 0) return;

            const progress = Math.min(
                1,
                Math.max(0, -rect.top / scrollable)
            );

            const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
            setCurrentFrame(frameIndex);

            // Load nearby frames
            for (let i = frameIndex - 2; i <= frameIndex + 2; i++) {
                if (i >= 0 && i < TOTAL_FRAMES) {
                    loadImage(i);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadedMap]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* DESKTOP */}
                <div className="hidden md:block relative w-full h-full">
                    {loadedMap[currentFrame] && (
                        <img
                            src={loadedMap[currentFrame]}
                            alt="Gemera"
                            className="absolute w-full h-full object-cover"
                        />
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                        <h1 className="text-7xl lg:text-8xl font-light uppercase tracking-[0.3em]">
                            Gemera
                        </h1>
                        <p className="mt-6 text-base tracking-[0.4em] uppercase text-gray-300">
                            The World's First Mega-GT
                        </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* MOBILE */}
                <div className="md:hidden flex flex-col items-center justify-center h-full px-6 text-center text-white">

                    {loadedMap[currentFrame] && (
                        <img
                            src={loadedMap[currentFrame]}
                            alt="Gemera"
                            className="w-[95vw] sm:w-[85vw] object-contain"
                        />
                    )}

                    <div className="mt-10">
                        <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-[0.25em]">
                            Gemera
                        </h1>

                        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-300">
                            The World's First Mega-GT
                        </p>

                        <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
                            A revolutionary four-seat hypercar combining electric innovation
                            and combustion performance to redefine grand touring forever.
                        </p>

                        <p className="mt-6 text-xs tracking-widest uppercase text-gray-500">
                            Scroll To Explore
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSequence;