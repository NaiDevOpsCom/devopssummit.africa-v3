import { type Ticket } from "@/types";

export const tickets: Ticket[] = [
  {
    id: 1,
    name: "Commit Pass",
    price: "KES 2,000",
    priceNote: "Student Rate",
    disclaimer: "Requirement: Valid student ID",
    features: [
      "Access to all keynote sessions and talks: both days",
      "Access to community networking sessions",
      "Meals provided throughout the event: both days",
      "Official ADS2026 lanyard",
      "Digital resource pack: speaker slides and curated reading materials delivered post-event",
      "Dedicated early-career networking session with mid and senior engineers",
    ],
    ctaLabel: "Buy Tickets Now",
  },
  {
    id: 2,
    name: "Deploy Pass",
    price: "KES 2,500",
    priceNote: "Early Bird",
    features: [
      "Access to all sessions, talks, and keynotes: both days",
      "Access to hands-on workshops and labs across DevOps, AI, and Security tracks",
      "Meals provided throughout the event: both days",
      "Official ADS2026 T-shirt",
      "ADS2026 lanyard",
      "Digital resource pack: speaker slides and curated materials delivered post-event",
      "Access to all community and professional networking sessions",
    ],
    ctaLabel: "Buy Tickets Now",
  },
  {
    id: 3,
    name: "Pipeline Pass",
    price: "KES 6,000",
    priceNote: "Total for 3 (KES 2,000/person)",
    features: [
      "Access to all talks and sessions: both days",
      "Hands-on workshops and labs: both days",
      "Meals provided throughout the event: both days",
      "Official ADS2026 T-shirts and lanyards for the team",
      "Speaker Q&A and networking lounge access",
      "Single consolidated invoice for straightforward team budgeting",
    ],
    ctaLabel: "Buy Tickets Now",
  },
];
