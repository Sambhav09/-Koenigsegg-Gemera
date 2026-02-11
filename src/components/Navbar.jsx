import { useState, useEffect } from "react";
import React from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : ""
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
                <div className="text-xl font-bold tracking-widest uppercase">
                    Koenigsegg
                </div>
                <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest">
                    {["Gemera", "Performance", "Interior", "Technology", "Gallery"].map(
                        (item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}>
                                {item}
                            </a>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;