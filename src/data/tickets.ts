import { type Ticket } from "@/types";

export const tickets: Ticket[] = [
  {
    id: 1,
    name: "Community Pass",
    price: "Free",
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
    name: "Virtual Pass",
    price: "Free",
    features: [
      "Live stream access",
      "Interactive Q&A",
      "Access to all talks",
      "Digital event materials",
    ],
    ctaLabel: "Get Tickets Now",
  },
];
