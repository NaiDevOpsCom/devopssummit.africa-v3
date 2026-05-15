import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TicketCard from "@/components/ui/TicketCard";
import { tickets } from "@/data/tickets";

const Tickets: React.FC = () => (
  <section id="tickets" className="py-20 md:py-28 bg-muted">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="Tickets"
        pill="Choose Your Seat at the Table"
        subtitle="Whether you are just starting out or leading engineering teams at scale, there is a place for you at #ADS2026"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap lg:flex-nowrap justify-center gap-6 mb-12 max-w-6xl mx-auto"
      >
        {tickets.map((t) => (
          <TicketCard key={t.id} {...t} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-8 md:p-12 text-center"
      >
        <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
          Need custom group or corporate tickets?
        </h3>
        <p className="text-muted-foreground mb-6">
          Contact our team for tailored packages and special rates.
        </p>
        <button
          type="button"
          className="inline-flex px-7 py-3 rounded-full border-2 border-foreground/20 text-foreground font-semibold text-sm hover:bg-foreground/5 transition-colors"
          aria-label="Contact for group rates"
        >
          Contact for Group Rates
        </button>
      </motion.div>
    </div>
  </section>
);

export default Tickets;
