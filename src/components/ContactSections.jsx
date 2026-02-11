import React from "react";

const galleryImages = [
    "/images/car-front.png",
    "/images/car-side.png",
    "/images/car-rear.png",
    "/images/car-top.png",
];

const specs = [
    { label: "Power", value: "1700 HP" },
    { label: "0–100 km/h", value: "1.9s" },
    { label: "Top Speed", value: "400 km/h" },
    { label: "Torque", value: "3500 Nm" },
];

const ContentSections = () => {
    return (
        <div className="bg-black text-white">

            {/* ABOUT SECTION */}
            <section id="about" className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-8">
                        The Mega-GT <span className="text-red-600">Redefined</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        The Koenigsegg Gemera is a revolutionary four-seater Mega-GT
                        combining extreme performance with everyday usability.
                        A hybrid powertrain delivering 1,700 horsepower redefines
                        what a grand tourer can be.
                    </p>
                </div>
            </section>

            {/* PERFORMANCE SECTION */}
            <section id="performance" className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {specs.map((item) => (
                        <div key={item.label} className="group">
                            <div className="text-4xl md:text-6xl font-light tracking-wide group-hover:text-red-500 transition duration-500">
                                {item.value}
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mt-3">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="gallery" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-16 text-center">
                        Gallery
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {galleryImages.map((src, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-xl group"
                            >
                                <img
                                    src={src}
                                    alt={`Gemera ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    );
};

export default ContentSections;