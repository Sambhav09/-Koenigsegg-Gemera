import { useRef, useEffect, useState } from "react";
import React from "react";

const carImages = [
    {
        label: "Front",
        src: "/images/car-front.png",
        desc: "Aggressive aerodynamic design with signature lighting.",
    },
    {
        label: "Side",
        src: "/images/car-side.png",
        desc: "Sculpted body lines engineered for airflow efficiency.",
    },
    {
        label: "Rear",
        src: "/images/car-rear.png",
        desc: "Active aero system and extreme performance diffuser.",
    },
];

const ParallaxCar = () => {
    const containerRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);

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

            const index = Math.floor(progress * carImages.length);
            setCurrentImage(Math.min(index, carImages.length - 1));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-black text-white">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">

                {/* SECTION TITLE */}
                <div className="absolute top-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-light tracking-widest uppercase">
                        Exterior Design
                    </h2>
                </div>

                {/* CAR IMAGES */}
                {carImages.map((item, i) => (
                    <img
                        key={item.src}
                        src={item.src}
                        alt={item.label}
                        loading="lazy"
                        className="
              absolute
              w-[95vw] sm:w-[85vw] md:max-w-[65vw]
              object-contain
              transition-all duration-700 ease-in-out
            "
                        style={{
                            opacity: currentImage === i ? 1 : 0,
                            transform:
                                currentImage === i
                                    ? "scale(1)"
                                    : "scale(0.95)",
                        }}
                    />
                ))}

                {/* DESCRIPTION (Mobile + Desktop Center Bottom) */}
                <div className="absolute bottom-28 text-center max-w-xl">
                    <h3 className="text-xl md:text-2xl uppercase lg:hidden tracking-[0.3em] mb-4">
                        {carImages[currentImage].label}
                    </h3>
                    <p className="text-gray-400 text-sm lg:hidden md:text-base leading-relaxed px-4">
                        {carImages[currentImage].desc}
                    </p>
                </div>

                {/* DESKTOP LEFT NAVIGATION */}
                <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2">
                    <div className="flex flex-col gap-8">
                        {carImages.map((item, i) => (
                            <div key={item.label} className="flex items-center gap-4">
                                <div
                                    className={`h-[2px] transition-all duration-500 ${currentImage === i
                                        ? "w-12 bg-red-600"
                                        : "w-6 bg-gray-600"
                                        }`}
                                />
                                <span
                                    className={`text-xs uppercase tracking-[0.3em] transition-all duration-500 ${currentImage === i
                                        ? "text-white"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOBILE NAVIGATION DOTS */}
                <div className="md:hidden absolute bottom-10 flex gap-4">
                    {carImages.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full transition-all duration-500 ${currentImage === i
                                ? "bg-red-600 scale-125"
                                : "bg-gray-500"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ParallaxCar;