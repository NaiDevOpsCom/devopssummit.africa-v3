import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamCard from "@/components/ui/TeamCard";
import { team } from "@/data/team";

const roles = ["All", "UI/UX Designer", "Project Manager", "Event Organizer", "Community Lead"];

const Team: React.FC = () => {
  const [activeRole, setActiveRole] = useState("All");
  const filtered = activeRole === "All" ? team : team.filter((t) => t.role === activeRole);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Re-init carousel when filter changes
  React.useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, activeRole]);

  return (
    <section id="team" className="py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          title="Our Team"
          pill="Meet the Team Behind Africa DevOps Summit"
          subtitle="A passionate team of organizers, engineers, and community builders working together to deliver a seamless experience."
          light
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {filtered.map((m) => (
                <div
                  key={m.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0"
                >
                  <TeamCard {...m} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeRole === r
                    ? "bg-white text-blue-900 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                aria-label={`Filter by ${r}`}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
