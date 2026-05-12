import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import BenefitCard from "@/components/ui/BenefitCard";
import { benefits } from "@/data/benefits";

const Benefits: React.FC = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="Two Days That Will Change How You Build"
        pill="Here is what you get when you show up"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((b) => (
          <BenefitCard key={b.id} {...b} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 text-center"
      >
        <a
          href="#tickets"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60"
        >
          Secure Your Seat
        </a>
      </motion.div>
    </div>
  </section>
);

export default Benefits;
