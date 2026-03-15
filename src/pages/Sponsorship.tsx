import React, { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Globe,
  TrendingUp,
  Megaphone,
  Monitor,
  Mic2,
  Check,
  Star,
  ArrowRight,
  Download,
  Mail,
  Quote,
  Building2,
  BarChart3,
  Target,
  Zap,
  Award,
  MessageSquare,
  Pause,
  Play,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { SafeLink } from "@/components/SafeLink";
import { sponsors as sponsorsData, sponsorTestimonials } from "@/data/sponsors";
import { getInitials } from "@/utils/getInitials";

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ------------------------------------------------------------------ */
/*  1 · Hero                                                           */
/* ------------------------------------------------------------------ */
const SponsorHero: React.FC = React.memo(() => (
  <section className="relative bg-dark-bg overflow-hidden">
    {/* Background Video */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="w-full h-full object-cover opacity-20"
      >
        <source
          src="https://res.cloudinary.com/nairobidevops/video/upload/v1773292702/summit2024_ivstfr.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/50 to-dark-bg" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto section-padding pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left — copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30 mb-6"
          >
            Sponsorship Opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-heading text-primary-foreground mb-5 leading-tight"
          >
            Partner with Africa's Leading <span className="text-gradient">DevOps Conference</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Position your brand at the forefront of Africa's fastest-growing DevOps community.
            Connect with 1,000+ engineers, decision-makers, and tech leaders shaping the continent's
            digital future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Become a Sponsor <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://example.com/sponsor-deck.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Sponsor Deck
            </a>
          </motion.div>
        </div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative rounded-2xl overflow-hidden border border-primary-foreground/10">
            <img
              src="https://res.cloudinary.com/nairobidevops/image/upload/v1773291530/IMG_9856_bvdoof.jpg"
              alt="Africa DevOps Summit conference"
              className="w-full h-80 object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-primary-foreground font-heading font-bold text-sm">
                Africa DevOps Summit 2025 — 500+ Attendees
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

/* ------------------------------------------------------------------ */
/*  2 · Why Sponsor                                                    */
/* ------------------------------------------------------------------ */
const whySponsorMetrics = [
  {
    icon: Users,
    value: "1,000+",
    label: "Expected Attendees",
    desc: "Engineers, CTOs, and tech leaders from across Africa",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Countries Represented",
    desc: "Pan-African and international audience reach",
  },
  {
    icon: TrendingUp,
    value: "50K+",
    label: "Community Members",
    desc: "Online reach across DevOps communities in Africa",
  },
  {
    icon: Megaphone,
    value: "100K+",
    label: "Social Media Reach",
    desc: "Impressions across Twitter/X, LinkedIn, and YouTube",
  },
  {
    icon: Monitor,
    value: "85%",
    label: "Senior Decision-Makers",
    desc: "Engineers, managers, and C-suite professionals",
  },
  {
    icon: BarChart3,
    value: "40+",
    label: "Media & Press Partners",
    desc: "Coverage by leading African tech publications",
  },
];

const WhySponsor: React.FC = React.memo(() => (
  <section className="py-20 md:py-28 bg-background">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="Why Sponsor the 2026 Summit"
        subtitle="Gain unmatched visibility, connect with Africa's brightest engineering minds, and demonstrate your commitment to the continent's tech growth."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {whySponsorMetrics.map((m) => (
          <motion.div
            key={m.label}
            variants={fadeUp}
            className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <m.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold font-heading text-foreground mb-1">{m.value}</p>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">{m.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));

/* ------------------------------------------------------------------ */
/*  3 · Audience Breakdown                                             */
/* ------------------------------------------------------------------ */
const audienceSegments = [
  { label: "DevOps & SRE Engineers", pct: 35 },
  { label: "Software Developers", pct: 25 },
  { label: "Tech Leaders & CTOs", pct: 20 },
  { label: "Cloud & Platform Engineers", pct: 12 },
  { label: "Students & Academics", pct: 8 },
];

const AudienceBreakdown: React.FC = React.memo(() => (
  <section className="py-20 md:py-28 bg-muted">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
            Know Your Audience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Audience Breakdown
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our attendees are senior practitioners and decision-makers from Africa's fastest-growing
            tech companies, startups, and enterprises. Sponsoring the summit puts your brand in
            front of the people who choose and champion the tools their teams use.
          </p>

          <div className="space-y-5">
            {audienceSegments.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{s.label}</span>
                  <span className="font-heading font-bold text-primary">{s.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
            alt="Conference audience networking"
            className="w-full h-full min-h-[320px] object-cover rounded-2xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  </section>
));

/* ------------------------------------------------------------------ */
/*  4 · Sponsorship Packages                                           */
/* ------------------------------------------------------------------ */
interface PackageTier {
  name: string;
  price: string;
  highlight?: boolean;
  benefits: string[];
  color: string;
}

const packages: PackageTier[] = [
  {
    name: "Community",
    price: "$1,000",
    color: "border-muted-foreground/30",
    benefits: [
      "Logo on website & event materials",
      "2 complimentary tickets",
      "Social media mentions",
      "Brand listing in programme booklet",
    ],
  },
  {
    name: "Silver",
    price: "$3,000",
    color: "border-muted-foreground/50",
    benefits: [
      "Everything in Community, plus:",
      "5 complimentary tickets",
      "Small booth in exhibition area",
      "Logo on event banners & stage backdrop",
      "1 sponsored social media post",
      "Access to attendee mailing list (opt-in)",
    ],
  },
  {
    name: "Gold",
    price: "$7,500",
    highlight: true,
    color: "border-primary",
    benefits: [
      "Everything in Silver, plus:",
      "10 complimentary tickets",
      "Premium booth placement",
      "5-minute stage address during session break",
      "Logo on attendee lanyards",
      "Branded swag in welcome packs",
      "Dedicated sponsor spotlight email",
      "Priority logo placement on all materials",
    ],
  },
  {
    name: "Platinum",
    price: "$15,000",
    color: "border-secondary",
    benefits: [
      "Everything in Gold, plus:",
      "20 complimentary tickets",
      "Largest premier booth",
      "15-minute keynote speaking slot",
      "Exclusive branding on main stage",
      "Branded networking lounge",
      "Full-page ad in digital programme",
      "Video content on event livestream",
      "Co-branded press release",
      "Year-round logo on website",
    ],
  },
];

const Packages: React.FC = React.memo(() => (
  <section id="packages" className="py-20 md:py-28 bg-background">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="Sponsorship Packages"
        subtitle="Choose a tier that matches your goals. Every package is designed to maximise your brand's visibility and engagement."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={fadeUp}
            className={`relative bg-card rounded-xl border-2 ${pkg.color} p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              pkg.highlight ? "ring-2 ring-primary/20 shadow-lg" : ""
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                Most Popular
              </span>
            )}
            <h3 className="font-bold text-lg font-heading text-foreground">{pkg.name}</h3>
            <div className="mt-3 mb-4">
              <span className="text-3xl font-bold text-primary font-heading">{pkg.price}</span>
            </div>
            <hr className="border-border mb-4" />
            <ul className="space-y-3 flex-1 mb-6">
              {pkg.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <SafeLink
              href="mailto:sponsors@africadevopssummit.com"
              className={`w-full py-3 rounded-full text-center font-semibold text-sm transition-opacity hover:opacity-90 ${
                pkg.highlight
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Get Started
            </SafeLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Sub-CTAs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-wrap justify-center gap-4"
      >
        <SafeLink
          href="mailto:sponsors@africadevopssummit.com"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Mail className="w-4 h-4" /> Contact Us for a Custom Package
        </SafeLink>
        <SafeLink
          href="https://example.com/sponsor-deck.pdf"
          target="_blank"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
        >
          <Download className="w-4 h-4" /> Download Sponsor Deck
        </SafeLink>
      </motion.div>
    </div>
  </section>
));

/* ------------------------------------------------------------------ */
/*  5 · Sponsorship Benefits                                           */
/* ------------------------------------------------------------------ */
const benefitBlocks = [
  {
    icon: Target,
    title: "Targeted Exposure",
    desc: "Reach a niche audience of DevOps professionals, cloud engineers, and tech executives — exactly who evaluates and adopts new tools.",
  },
  {
    icon: Mic2,
    title: "Speaking Opportunities",
    desc: "Gold and Platinum sponsors get stage time to showcase products, share thought leadership, and demonstrate expertise.",
  },
  {
    icon: Building2,
    title: "Exhibition Booth",
    desc: "Set up an interactive booth to demo your products, collect leads, and have meaningful face-to-face conversations.",
  },
  {
    icon: Zap,
    title: "Brand Amplification",
    desc: "Your logo across banners, digital screens, lanyards, social media, livestream, and press releases — before, during, and after the event.",
  },
  {
    icon: Award,
    title: "Talent Pipeline",
    desc: "Access to Africa's top engineering talent. Sponsors get priority access to our career fair and resume database.",
  },
  {
    icon: MessageSquare,
    title: "Community Goodwill",
    desc: "Demonstrate your commitment to Africa's tech ecosystem. Sponsors are celebrated as champions of the DevOps movement.",
  },
];

const SponsorBenefits: React.FC = React.memo(() => (
  <section className="py-20 md:py-28 bg-dark-bg">
    <div className="max-w-7xl mx-auto section-padding">
      <SectionHeader
        title="What You Get as a Sponsor"
        subtitle="Beyond a logo — real, measurable impact for your brand."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefitBlocks.map((b) => (
          <motion.div
            key={b.title}
            variants={fadeUp}
            className="bg-card-dark rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <b.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold font-heading text-primary-foreground mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));

const AVATAR_PALETTE = [
  "bg-primary/20 text-primary",
  "bg-violet-500/20 text-violet-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
  "bg-sky-500/20 text-sky-400",
  "bg-indigo-500/20 text-indigo-400",
  "bg-teal-500/20 text-teal-400",
];

function avatarColor(name: string) {
  const idx = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[idx];
}

/* ------------------------------------------------------------------ */
/*  6 · Testimonials                                                   */
/* ------------------------------------------------------------------ */
const Testimonials: React.FC = React.memo(() => {
  const total = sponsorTestimonials.length;
  const [startIdx, setStartIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5.5 s, paused when page is hidden or user manually paused
  useEffect(() => {
    if (total === 0 || isPaused) return;

    let timerId: ReturnType<typeof setInterval>;

    const startTimer = () => {
      timerId = setInterval(() => setStartIdx((p) => (p + 1) % total), 5500);
    };

    const stopTimer = () => {
      if (timerId) clearInterval(timerId);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [total, isPaused, startIdx]); // Reset timer when index changes (manual navigation)

  if (total === 0) return null;

  // Pick leading items starting from startIdx (wrapping)
  // We limit visibleCount to Math.min(5, total) to avoid duplication when length < 5
  const visibleCount = Math.min(5, total);
  const visible = Array.from(
    { length: visibleCount },
    (_, i) => sponsorTestimonials[(startIdx + i) % total],
  );
  const [featured, ...gridCards] = visible;

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          title="What Our Sponsors Say"
          subtitle="Hear from companies that have partnered with us in previous editions."
        />

        {/* Bento grid: 1 large featured card + 2×2 smaller cards */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold hover:bg-muted transition-colors"
            aria-label={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3" /> Resume
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" /> Pause
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4 items-start">
          {/* ── Featured card ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7 }}
              className="lg:row-span-2 bg-card border border-border rounded-2xl p-8 flex flex-col min-h-[340px] relative overflow-hidden hover:border-primary/50 transition-colors duration-300"
            >
              {/* Decorative glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Company tag */}
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 block">
                {featured.company}
              </span>

              <Quote className="w-10 h-10 text-primary/25 mb-4" />

              <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed flex-1 mb-8">
                &ldquo;{featured.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColor(featured.name)}`}
                >
                  {getInitials(featured.name)}
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">{featured.name}</p>
                  <p className="text-xs text-muted-foreground">{featured.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── 4 smaller grid cards ── */}
          {gridCards.map((t, i) => (
            <AnimatePresence key={i} mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <p className="text-muted-foreground leading-relaxed flex-1 mb-5 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${avatarColor(t.name)}`}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {/* Dot pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setStartIdx(i);
                setIsPaused(true);
              }}
              aria-label={`Go to testimonial set ${i + 1}`}
              aria-current={i === startIdx ? "true" : undefined}
              className={`rounded-full transition-all duration-300 ${
                i === startIdx
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

/* ------------------------------------------------------------------ */
/*  7 · Previous Sponsors                                              */
/* ------------------------------------------------------------------ */
const PastSponsors: React.FC = React.memo(() => {
  const currentYear = new Date().getFullYear();
  const pastSponsorsEntries = Object.entries(sponsorsData).filter(
    ([year]) => Number(year) !== currentYear,
  );

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          title="Previous Sponsors & Partners"
          subtitle="We're grateful to the companies that have supported the DevOps movement in Africa."
        />

        {pastSponsorsEntries.length === 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No past sponsors to display at the moment.
            </p>
          </motion.div>
        ) : (
          pastSponsorsEntries
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, sponsors]) => (
              <div key={year} className="mb-12 last:mb-0">
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="font-heading font-bold text-lg text-foreground mb-6"
                >
                  Africa DevOps Summit {year}
                </motion.h3>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {sponsors.map((s) => (
                    <motion.div
                      key={`${year}-${s.id}`}
                      variants={fadeUp}
                      className="bg-card rounded-xl border border-border p-6 md:p-8 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-primary min-h-[120px] md:min-h-[160px]"
                    >
                      <img
                        src={s.logoUrl}
                        alt={`${s.name} logo`}
                        className="max-h-16 md:max-h-24 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                        title={s.name}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))
        )}
      </div>
    </section>
  );
});

/* ------------------------------------------------------------------ */
/*  8 · Final CTA                                                      */
/* ------------------------------------------------------------------ */
const FinalCTA: React.FC = React.memo(() => (
  <section className="py-20 md:py-28 bg-primary">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto section-padding text-center"
    >
      <Star className="w-10 h-10 text-primary-foreground/40 mx-auto mb-4" />
      <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
        Ready to Make an Impact?
      </h2>
      <p className="text-primary-foreground/80 mb-8 leading-relaxed">
        Join the leading brands powering Africa's DevOps revolution. Let's build something
        remarkable together — reach out today and secure your sponsorship for the 2026 summit.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="mailto:sponsors@africadevopssummit.com"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary-foreground text-primary font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Mail className="w-4 h-4" /> Contact the Sponsorship Team
        </a>
        <a
          href="https://example.com/sponsor-deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
        >
          <Download className="w-4 h-4" /> Download Sponsor Deck
        </a>
      </div>
    </motion.div>
  </section>
));

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const Sponsorship: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <main>
      <SEO
        title="Sponsorship"
        description="Partner with Africa's leading DevOps conference. Sponsor packages from Community to Platinum — reach 1,000+ engineers and tech leaders."
        keywords="sponsor, DevOps sponsorship, Africa conference, partnership, exhibitor"
        canonicalUrl="/sponsorship"
      />
      <Navbar />
      <SponsorHero />
      <WhySponsor />
      <AudienceBreakdown />
      <Packages />
      <SponsorBenefits />
      <Testimonials />
      <PastSponsors />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Sponsorship;
