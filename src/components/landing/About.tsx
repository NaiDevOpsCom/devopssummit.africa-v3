import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { stats } from "@/data/summitData";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const DecorativeDots: React.FC<{ className?: string; count?: number }> = ({
  className,
  count = 24,
}) => {
  // Calculate rows based on 4 columns and count
  const cols = 4;
  const rows = Math.ceil(count / cols);
  const dotSize = 0.375; // w-1.5 (6px) + gap-4 (16px) ≈ 0.375rem when considering grid
  const dynamicHeight = `${rows * dotSize + (rows - 1) * 1.25}rem`; // Account for gaps
  const wrapperClassName = ["w-24 grid grid-cols-4 gap-4 opacity-50 z-0 hidden md:grid", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} style={{ height: dynamicHeight }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
      ))}
    </div>
  );
};

const About: React.FC = () => (
  <section id="about" className="py-20 md:py-28 bg-background">
    <div className="max-w-7xl mx-auto section-padding">
      {/* Top Header with Black Lines */}
      <div className="flex items-center justify-center gap-4 mb-20 md:mb-24 overflow-hidden">
        <div className="h-[1px] flex-grow bg-foreground/20 max-w-[150px] md:max-w-[250px]" />
        <h2 className="text-2xl md:text-4xl font-bold text-foreground whitespace-nowrap tracking-tight">
          About Africa DevOps Summit
        </h2>
        <div className="h-[1px] flex-grow bg-foreground/20 max-w-[150px] md:max-w-[250px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      >
        {/* Left Column: Image with Decorative Dots & Stats */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-12 md:gap-16">
          {/* Image Wrapper with Decorations */}
          <div className="relative">
            {/* Decorative Dots Pattern - Top Left */}
            <DecorativeDots className="absolute -top-10 -left-10" />

            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/5 aspect-[4/3]">
              <img
                src="https://ik.imagekit.io/nairobidevops/ads2025/IMG_6554.JPG"
                alt="Africa DevOps Summit Conference"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Dots Pattern - Bottom Right */}
            <DecorativeDots className="absolute -bottom-10 -right-10" />
          </div>

          {/* Stats Section - Positioned below the image */}
          <div className="w-full bg-primary text-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/10 relative z-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <div className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium leading-tight opacity-90">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* "About Us" Pill Header */}
          <div className="flex items-center gap-0 mb-8 overflow-hidden">
            <div className="h-[1px] w-12 md:w-20 bg-primary/40 mr-4" />
            <div className="bg-primary text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md">
              About the Summit
            </div>
            <div className="h-[1px] w-12 md:w-20 bg-primary/40 ml-4" />
          </div>

          <div className="space-y-6 mb-12 text-foreground">
            <p className="text-lg leading-relaxed">
              Africa DevOps Summit is the continent's premier gathering for engineers, platform
              builders, AI practitioners, and security professionals who are doing the most
              consequential technical work of our time.
            </p>
            <p className="text-lg leading-relaxed">
              For too long, Africa's engineering community has been handed frameworks designed in
              San Francisco and conference agendas that treat the continent as an afterthought.
              ADS2026 exists to end that story. The work happening in Nairobi, Lagos, Accra, Kigali,
              Cape Town, and Cairo is not a smaller version of problems solved elsewhere. It is
              harder, more complex, and more consequential.
            </p>
            <p className="text-lg leading-relaxed">
              This is not a catch-up conference. Africa's tech ascent is already happening. #ADS2026
              is where we name it, celebrate it, and accelerate it together.
            </p>
            <p className="text-xl md:text-2xl font-black text-primary pt-4 tracking-tight">
              Two days. Three disciplines. One continent-wide community.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Learn More About ADS
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default About;
