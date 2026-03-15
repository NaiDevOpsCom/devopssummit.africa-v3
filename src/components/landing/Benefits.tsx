import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import BenefitCard from "@/components/ui/BenefitCard";
import { benefits } from "@/data/benefits";

const Benefits: React.FC = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader title="What To Expect" pill="Benefits" />

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
    </div>
  </section>
);

export default Benefits;
