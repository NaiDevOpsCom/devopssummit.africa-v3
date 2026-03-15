import { Ticket } from "@/types";

export const tickets: Ticket[] = [
  {
    id: 1,
    name: "Community Pass",
    price: "Free",
    priceNote: "$0",
    features: [
      "Access to keynotes",
      "Community networking",
      "Access to exhibits",
      "Event swag bag",
    ],
    ctaLabel: "Get Tickets Now",
  },
  {
    id: 2,
    name: "Team / Corporate Pass",
    price: "$140",
    priceNote: "$20 each",
    features: [
      "Everything in Community",
      "Reserved VIP seats",
      "Access to all tracks",
      "Priority networking",
    ],
    ctaLabel: "Buy Tickets Now",
  },
  {
    id: 3,
    name: "Pro Pass",
    price: "$50",
    features: ["Hands-on workshops", "Speaker Q&A", "Access to all talks", "Networking lounge"],
    ctaLabel: "Buy Tickets Now",
  },
  {
    id: 4,
    name: "Community Pass",
    price: "Free",
    priceNote: "Virtual",
    features: [
      "Live stream access",
      "Interactive Q&A",
      "Access to all talks",
      "Digital event materials",
    ],
    ctaLabel: "Get Tickets Now",
  },
];
