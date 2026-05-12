import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Infinity as InfinityIcon, Brain, Shield } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const DISCIPLINES = [
  {
    icon: InfinityIcon,
    label: "DevOps",
    title: "DevOps & Platform Engineering",
    description:
      "CI/CD pipelines, platform engineering, cloud-native infrastructure, and SRE — built under constraints that demand creativity most global teams never encounter. That ingenuity is not a limitation. It is Africa's competitive advantage.",
  },
  {
    icon: Brain,
    label: "AI & ML",
    title: "Artificial Intelligence & MLOps",
    description:
      "African teams are deploying AI in fintech, healthtech, agritech, and logistics right now — with tighter budgets and higher stakes. The MLOps, LLMOps, and edge AI work on this continent is world-class and almost entirely untold on the global stage.",
  },
  {
    icon: Shield,
    label: "Security",
    title: "Security & DevSecOps",
    description:
      "As Africa's digital economy grows, so does the attack surface. DevSecOps here is not a compliance checkbox — it is an existential engineering priority. Africa's security engineers are building defences that the rest of the world will eventually need to study.",
  },
];

const WhatWeCover = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section id="coverage" className="section-padding py-24 bg-muted overflow-hidden">
      <div className="container mx-auto">
        <SectionHeader
          title="Three Disciplines. One Summit."
          subtitle="DevOps, AI, and Security aren't three separate tracks bolted together. They're three forces converging inside every serious engineering organization on this continent right now — and their intersection is where the most important work of the next decade happens."
          pill="What We Cover"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {DISCIPLINES.map((discipline) => (
            <motion.div
              key={discipline.label}
              variants={fadeUp}
              className="group relative p-8 rounded-2xl bg-card/10 border border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />

              <div className="flex flex-col h-full">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <discipline.icon className="w-7 h-7" />
                </div>

                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                  {discipline.label}
                </span>

                <h3 className="text-xl font-heading font-bold text-pure-black mb-4 group-hover:text-primary transition-colors">
                  {discipline.title}
                </h3>

                <p className="text-pure-black/70 text-base leading-relaxed mb-6 flex-grow">
                  {discipline.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-pure-black text-lg mb-8 max-w-3xl mx-auto italic font-medium leading-relaxed">
            Together, these three disciplines tell the complete story of what it means to build
            resilient, intelligent, secure technology in Africa in 2026.
          </p>

          {/*  */}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(WhatWeCover);
