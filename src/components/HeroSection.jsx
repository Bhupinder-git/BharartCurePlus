import React, { useState, useEffect } from "react";
import HeroBackground from "../assets/HeroSectionBackgound.jpg";

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Your Wellness, Our Priority";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const handleGetStarted = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);

        // Hide cursor after a brief delay when typing is complete
        setTimeout(() => {
          setShowCursor(false);
        }, 1000); // Wait 1 second after typing completes, then hide cursor
      }
    }, 100); // Adjust speed by changing this value (lower = faster)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-100px)] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/55 via-orange-300/45 to-transparent bg-[length:50%_100%] bg-left bg-no-repeat"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full w-11/12 max-w-[1600px] mx-auto">
        <div className="max-w-2xl space-y-6">
          {/* Logo/Brand Name */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight">
              Bharat Cure <span className="text-black">+</span>
            </h1>
          </div>

          {/* Tagline with Typewriter Animation */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800 tracking-wide uppercase min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[3.5rem]">
            {typewriterText}
            {showCursor && (
              <span className="inline-block w-0.5 h-6 md:h-8 lg:h-10 bg-slate-800 ml-1 animate-pulse">
                |
              </span>
            )}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-xl">
            Transforming healthcare emergencies from chaos to clarity. Real-time
            beds, transparent costs, instant blood access, verified reviews -
            delivering life-saving information in thirty seconds when every
            second counts for Indian families.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleGetStarted}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Get Started
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black font-semibold px-8 py-3 rounded-lg border-2 border-white/30 transition-all duration-300 hover:border-white/50">
              Learn More
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-1 h-full bg-white opacity-80 animate-border-run-1"></div>
              </div>
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black font-semibold px-5 py-3 rounded-lg border-2 border-white/60 transition-all duration-300 hover:border-white/80 flex flex-col items-center relative">
                <div className="text-3xl font-bold text-black">24/7</div>
                <div className="text-sm text-black">Available</div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-1 h-full bg-white opacity-80 animate-border-run-2"></div>
              </div>
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black font-semibold px-5 py-3 rounded-lg border-2 border-white/60 transition-all duration-300 hover:border-white/80 flex flex-col items-center relative">
                <div className="text-3xl font-bold text-black">100+</div>
                <div className="text-sm text-black">Hospitals</div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-1 h-full bg-white opacity-80 animate-border-run-3"></div>
              </div>
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-black font-semibold px-5 py-3 rounded-lg border-2 border-white/60 transition-all duration-300 hover:border-white/80 flex flex-col items-center relative">
                <div className="text-3xl font-bold text-black">1000+</div>
                <div className="text-sm text-black">Lives Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
