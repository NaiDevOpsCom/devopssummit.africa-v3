import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { summitDetails } from "@/data/summitData";

const _parsedDate = Date.parse(summitDetails.datetime);
/** Falls back to `null` if datetime is missing or malformed, disabling the countdown and showing a fallback message. */
const EVENT_DATE = Number.isNaN(_parsedDate) ? null : _parsedDate;

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (EVENT_DATE === null) return; // no valid date — leave zeros, show fallback message
    const tick = () => {
      const diff = Math.max(EVENT_DATE - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

const ParticleCanvas: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false }) || canvas.getContext("2d")!;
    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      // Reduce density: higher divisor means fewer particles
      const divisor = window.innerWidth < 768 ? 25000 : 15000;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / divisor), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      }));
    };

    const drawConnections = (
      p: { x: number; y: number },
      i: number,
      maxDist: number,
      maxDistSq: number,
    ) => {
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;

        // Optimization: Skip pairs that are obviously too far apart without calculating square root
        if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) continue;

        const distSq = dx * dx + dy * dy;
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      // Use a slightly opaque clear to create a very subtle trail effect if desired,
      // but simple clear is faster.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDist = 120;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.o})`;
        ctx.fill();

        drawConnections(p, i, maxDist, maxDistSq);
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] opacity-60" />;
});
ParticleCanvas.displayName = "ParticleCanvas";

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
      {label}
    </span>
  </div>
);

const Hero: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="https://ik.imagekit.io/nairobidevops/ads2025/IMG_6738.JPG?tr=w-1920,q-80,f-auto"
        >
          <source
            src="https://res.cloudinary.com/nairobidevops/video/upload/v1773297162/summit2025_wqebkh.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-dark-bg/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Particle overlay */}
      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full py-32 md:py-0">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">
              {summitDetails.date}.{" "}
              <a
                href={summitDetails.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all cursor-pointer"
              >
                {summitDetails.location}
              </a>
              .
            </span>
            <span className="text-sm font-medium text-primary/70 tracking-wide">#ADS2026</span>
            <span className="text-sm font-medium text-primary/70 tracking-wide">#ADSummit2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6"
          >
            <span className="text-primary-foreground">Shaping the Future</span>
            <br />
            <span className="text-primary-foreground">of </span>
            <span className="text-primary">African Tech</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Driving collaboration, innovation, and scalable DevOps practices to support African
            digital transformation and strengthen communities across industries.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-10"
          >
            {EVENT_DATE === null ? (
              <p className="text-muted-foreground text-sm">Event date coming soon — stay tuned!</p>
            ) : (
              <>
                <CountdownUnit value={days} label="Days" />
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary/40 self-start">
                  :
                </span>
                <CountdownUnit value={hours} label="Hours" />
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary/40 self-start">
                  :
                </span>
                <CountdownUnit value={minutes} label="Min" />
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary/40 self-start">
                  :
                </span>
                <CountdownUnit value={seconds} label="Sec" />
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/sponsorship#packages"
              className="px-7 py-3 rounded-full border-2 border-primary bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:border-primary/90 transition-all text-center"
              aria-label="Become a Sponsor"
            >
              Become a Sponsor
            </Link>
            <a
              href="https://talks.nairobidevops.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full border-2 border-white/40 bg-transparent text-white font-semibold text-sm hover:bg-white hover:text-black transition-all text-center"
              aria-label="Become a Speaker"
            >
              Become a Speaker
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
