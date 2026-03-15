import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homepageFaqs } from "@/data/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const FAQPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="faqs" className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-4xl mx-auto section-padding">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers to the most common questions about the summit."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {homepageFaqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <AccordionItem
                  value={`home-faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-card data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground font-heading font-semibold text-sm md:text-base hover:no-underline gap-4">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/faqs")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            View All FAQs
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(FAQPreview);
