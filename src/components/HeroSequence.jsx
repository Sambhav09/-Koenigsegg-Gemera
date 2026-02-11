import { useEffect, useRef, useState } from "react";
import React from "react";

const TOTAL_FRAMES = 40;
const IMAGE_PATH = "/images/sequence";
const INITIAL_LOAD = 6;

const HeroSequence = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const requestRef = useRef(null);

  const getFrameSrc = (index) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `${IMAGE_PATH}/ezgif-frame-${frameNumber}.webp`; // use webp if possible
  };

  const loadImage = (index) => {
    if (imagesRef.current[index]) return;

    const img = new Image();
    img.src = getFrameSrc(index);
    imagesRef.current[index] = img;
  };

  // ✅ Load first few instantly
  useEffect(() => {
    for (let i = 0; i < INITIAL_LOAD; i++) {
      loadImage(i);
    }

    // ✅ Load rest in background after page idle
    const idleLoad = () => {
      for (let i = INITIAL_LOAD; i < TOTAL_FRAMES; i++) {
        loadImage(i);
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(idleLoad);
    } else {
      setTimeout(idleLoad, 500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (requestRef.current) return;

      requestRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const totalHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollable = totalHeight - viewportHeight;

        const progress = Math.min(
          1,
          Math.max(0, -rect.top / scrollable)
        );

        const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIndex);

        // Load nearby frames just in case
        for (let i = frameIndex - 2; i <= frameIndex + 2; i++) {
          if (i >= 0 && i < TOTAL_FRAMES) {
            loadImage(i);
          }
        }

        requestRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={imagesRef.current[currentFrame]?.src}
          alt="Gemera"
          className="absolute w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSequence;
