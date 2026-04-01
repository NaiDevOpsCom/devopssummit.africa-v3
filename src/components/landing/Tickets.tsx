import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TicketCard from "@/components/ui/TicketCard";
import { tickets } from "@/data/tickets";

const GROUP_TICKET_EMAIL_TO = "nairobi@devopssummit.africa";
const GROUP_TICKET_EMAIL_CC = "events@nairobidevops.org,nairobi@devopssummit.africa";
const GROUP_TICKET_EMAIL_SUBJECT =
  "Custom Group / Corporate Ticket Enquiry \u2014 Africa DevOps Summit 2026";
const GROUP_TICKET_EMAIL_BODY = `Hi Africa DevOps Summit Team,

I'm interested in a custom or group ticket package for Africa DevOps Summit 2026 (November 20-21, Nairobi, Kenya). Please find my details below.

YOUR DETAILS
------------
Organisation / Company Name: [Your organisation]
Contact Person (Full Name):  [Your full name]
Job Title / Role:            [Your role]
Email Address:               [Your email]
Phone Number (optional):     [Your phone]

GROUP & PACKAGE REQUIREMENTS
-----------------------------
Number of Attendees:
  [ ] 5-10   [ ] 11-20   [ ] 21-50   [ ] 50+

Attendance Format:
  [x] In-Person (Nairobi, Kenya) — this is an in-person event only.

Package Interest:
  [ ] Group discount (bulk standard tickets)
  [ ] Corporate package (branding + tickets bundle)
  [ ] Workshop / training add-ons
  [ ] Other: _______________

Special Requirements or Questions:
[Describe your needs, accessibility requirements, or any questions...]

Preferred Callback Date / Time:
[e.g. Weekdays before 3 PM EAT]

------
Thank you! We look forward to welcoming your team at Africa DevOps Summit 2026.`;

const groupTicketMailto =
  "mailto:" +
  GROUP_TICKET_EMAIL_TO +
  "?cc=" +
  encodeURIComponent(GROUP_TICKET_EMAIL_CC) +
  "&subject=" +
  encodeURIComponent(GROUP_TICKET_EMAIL_SUBJECT) +
  "&body=" +
  encodeURIComponent(GROUP_TICKET_EMAIL_BODY);

const Tickets: React.FC = () => (
  <section id="tickets" className="py-20 md:py-28 bg-muted">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="Tickets"
        pill="Secure your place at Africa DevOps today!"
        subtitle="Choose a ticket that fits your learning goals, whether you're attending in person or joining the conversation online."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
        className="bg-primary rounded-xl border border-border p-8 md:p-12 text-center"
      >
        <h3 className="text-2xl font-bold font-heading text-white mb-2">
          Need custom group or corporate tickets?
        </h3>
        <p className="text-white/60 mb-6">
          Contact our team for tailored packages and special rates.
        </p>
        <a
          href={groupTicketMailto}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-10 py-4 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-primary transition-all"
          aria-label="Contact us for group or corporate ticket rates"
        >
          Contact for Group Rates
        </a>
      </motion.div>
    </div>
  </section>
);

export default Tickets;
