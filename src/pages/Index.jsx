import Navbar from "../components/Navbar";
import HeroSequence from "../components/HeroSequence";
import ParallaxCar from "../components/ParallaxCar";
import ContentSections from "../components/ContactSections";
import React from "react";

const Index = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <HeroSequence />
            <ParallaxCar />
            <ContentSections />
        </div>
    );
};

export default Index;