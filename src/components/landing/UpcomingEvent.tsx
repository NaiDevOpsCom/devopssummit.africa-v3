import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Video } from "lucide-react";
import { SafeLink } from "@/components/SafeLink";
import { summitDetails } from "@/data/summitData";

const BACKGROUND_IMAGES = [
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6554.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6738.JPG",
  "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6619.JPG",
];

const FALLBACK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const UpcomingEvent: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    const preloaders = BACKGROUND_IMAGES.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    return () => {
      preloaders.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Resume when tab becomes visible
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      // Only update if document is visible
      if (document.visibilityState === "visible") {
        setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
      }
    }, 5000); // Cycle every 5 seconds

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section id="upcoming" className="relative py-20 md:py-28 bg-dark-bg overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={BACKGROUND_IMAGES[currentImageIndex]}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={BACKGROUND_IMAGES[currentImageIndex]}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.dataset.errorHandled === "true") return;
                target.dataset.errorHandled = "true";
                target.onerror = null;
                target.src = FALLBACK_IMAGE;
              }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Black Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* Decorative dots - kept with lower opacity to blend */}
      <div
        className="absolute inset-0 opacity-10 z-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary, hsl(217 91% 60%)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-30 max-w-4xl mx-auto section-padding text-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          <p className="text-primary font-bold text-sm mb-3 tracking-widest uppercase">
            Upcoming Event
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading text-white mb-6 tracking-tight">
            Build. Scale. Automate Africa.
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The premier DevOps, Cloud & SRE conference for Africa's technology leaders, engineers
            and innovators.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base font-semibold text-gray-200">
            <SafeLink
              href={summitDetails.mapLink}
              className="flex items-center gap-2 hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
              <MapPin className="w-5 h-5 text-primary" /> {summitDetails.location}
            </SafeLink>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Calendar className="w-5 h-5 text-primary" /> {summitDetails.date}
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Video className="w-5 h-5 text-primary" /> In-Person
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="#tickets"
              className="px-10 py-4 rounded-full bg-primary text-white font-bold text-base hover:scale-105 transition-transform shadow-lg shadow-primary/25"
              aria-label="Get a Ticket"
            >
              Get a Ticket
            </a>
            <Link
              to="/sponsorship#packages"
              className="px-10 py-4 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-dark-bg transition-all"
              aria-label="Become a Sponsor"
            >
              Become a Sponsor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
