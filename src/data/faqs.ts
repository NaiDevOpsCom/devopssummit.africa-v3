export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "General",
  "Tickets & Registration",
  "Speakers & Content",
  "Venue & Travel",
  "Sponsorship",
  "Community",
] as const;

export const faqs: FAQItem[] = [
  /* ── General ── */
  {
    category: "General",
    question: "What is the Africa DevOps Summit?",
    answer:
      "The Africa DevOps Summit is Africa's premier conference dedicated to DevOps, Cloud Engineering, SRE, and Platform Engineering. It brings together practitioners, leaders, and innovators from across the continent and beyond to share knowledge, build connections, and drive the future of software delivery in Africa.",
  },
  {
    category: "General",
    question: "When and where is the 2026 summit?",
    answer:
      "The Africa DevOps Summit 2026 takes place on August 14–15, 2026, at the Sarit Expo Centre in Nairobi, Kenya. The venue is conveniently located with easy access to hotels, restaurants, and public transport.",
  },
  {
    category: "General",
    question: "Who should attend the summit?",
    answer:
      "The summit is designed for DevOps Engineers, SREs, Cloud Architects, Platform Engineers, CTOs, Engineering Managers, and anyone passionate about modern software delivery practices. Whether you're a beginner or an expert, there's something for everyone.",
  },
  {
    category: "General",
    question: "Is this an in-person or virtual event?",
    answer:
      "The 2026 summit is a hybrid event. Attendees can join us in person in Nairobi or participate virtually through our live-streaming platform with interactive Q&A and networking features.",
  },
  {
    category: "General",
    question: "What topics are covered at the summit?",
    answer:
      "Sessions cover a wide range of topics including CI/CD pipelines, Kubernetes & container orchestration, cloud-native architecture, infrastructure as code, observability & monitoring, security (DevSecOps), AI/ML Ops, platform engineering, and leadership in engineering teams.",
  },

  /* ── Tickets & Registration ── */
  {
    category: "Tickets & Registration",
    question: "How do I register for the summit?",
    answer:
      "You can register directly on our website by clicking the 'Get a Ticket' button. Choose your preferred ticket tier (Community, Regular, or VIP), complete the registration form, and make payment. You'll receive a confirmation email with your ticket details.",
  },
  {
    category: "Tickets & Registration",
    question: "What ticket types are available?",
    answer:
      "We offer three ticket tiers: Community (free, limited availability) — access to main-stage talks and networking; Regular — full access including workshops and lunch; VIP — all Regular benefits plus front-row seating, exclusive networking dinner, and a swag bag.",
  },
  {
    category: "Tickets & Registration",
    question: "Are there group or student discounts?",
    answer:
      "Yes! We offer a 20% discount for groups of 5 or more from the same organisation. Students with a valid student ID can apply for our Student Scholarship programme which provides free or discounted tickets. Contact us at tickets@africadevops.com for details.",
  },
  {
    category: "Tickets & Registration",
    question: "What is the refund and cancellation policy?",
    answer:
      "Full refunds are available up to 30 days before the event. Between 30 and 7 days prior, a 50% refund is offered. Within the final 7 days, tickets are non-refundable but transferable to another attendee at no cost.",
  },

  /* ── Speakers & Content ── */
  {
    category: "Speakers & Content",
    question: "How can I apply to speak at the summit?",
    answer:
      "Our Call for Papers (CFP) opens approximately 6 months before the event. Submit your proposal through our website with a title, abstract, and brief bio. Our review committee evaluates proposals based on relevance, originality, and speaker experience. Selected speakers receive a complimentary VIP ticket.",
  },
  {
    category: "Speakers & Content",
    question: "Will session recordings be available?",
    answer:
      "Yes, all main-stage talks and selected workshops will be recorded and made available to registered attendees within two weeks after the event. Virtual ticket holders get lifetime access to the recordings.",
  },
  {
    category: "Speakers & Content",
    question: "What session formats are offered?",
    answer:
      "The summit features keynotes (30–45 min), technical talks (25 min), hands-on workshops (90 min), lightning talks (10 min), panel discussions, and unconference sessions proposed by attendees on the day.",
  },

  /* ── Venue & Travel ── */
  {
    category: "Venue & Travel",
    question: "Do you provide visa invitation letters?",
    answer:
      "Yes, we provide official visa invitation letters for registered international attendees. After completing your registration, request one through your attendee dashboard and we'll issue it within 5 business days.",
  },
  {
    category: "Venue & Travel",
    question: "Are there recommended hotels nearby?",
    answer:
      "We've partnered with several hotels near the Sarit Expo Centre offering discounted rates for summit attendees: The Trademark Hotel, Four Points by Sheraton, and Sankara Nairobi. Use code ADS2026 when booking for the discounted rate.",
  },
  {
    category: "Venue & Travel",
    question: "Is the venue accessible?",
    answer:
      "Yes, the Sarit Expo Centre is fully wheelchair-accessible with ramps, accessible restrooms, and reserved seating areas. If you have specific accessibility requirements, please let us know during registration so we can make arrangements.",
  },

  /* ── Sponsorship ── */
  {
    category: "Sponsorship",
    question: "How can my company sponsor the summit?",
    answer:
      "Visit our Sponsorship page for detailed packages and benefits. We offer Platinum, Gold, Silver, and Community sponsorship tiers, as well as custom packages. Contact sponsors@africadevops.com or download our sponsor deck for more information.",
  },
  {
    category: "Sponsorship",
    question: "What are the benefits of sponsoring?",
    answer:
      "Sponsors gain brand visibility among 2,000+ DevOps professionals, recruiting access to top engineering talent, speaking opportunities, exhibition space, logo placement across all marketing materials, and direct engagement with decision-makers in Africa's tech ecosystem.",
  },

  /* ── Community ── */
  {
    category: "Community",
    question: "How can I get involved as a volunteer?",
    answer:
      "We welcome volunteers! Join our community Slack workspace and fill out the volunteer form on our website. Volunteers receive a free ticket, an exclusive volunteer t-shirt, and the opportunity to network with speakers and organisers.",
  },
  {
    category: "Community",
    question: "Is there a Code of Conduct?",
    answer:
      "Absolutely. We are committed to providing a safe, inclusive, and harassment-free experience for everyone. Our full Code of Conduct is available on our website. All participants — attendees, speakers, sponsors, and staff — are expected to abide by it.",
  },
  {
    category: "Community",
    question: "How can I stay updated on summit news?",
    answer:
      "Subscribe to our newsletter in the footer of our website, follow us on Twitter/X, LinkedIn, and Instagram (@AfricaDevOps), and join our community Slack workspace for real-time updates and discussions.",
  },
];

/** Top FAQs shown on the homepage (first N from key categories) */
export const homepageFaqs = faqs.filter((_, i) => [0, 1, 2, 5, 6, 8].includes(i));
