import React from "react";
import { Ticket } from "@/types";
import { Check } from "lucide-react";

const TicketCard: React.FC<Ticket> = ({ name, price, priceNote, features, ctaLabel }) => (
  <div className="bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <h3 className="font-bold text-lg font-heading text-foreground">{name}</h3>
    <div className="mt-3 mb-4">
      <span className="text-3xl font-bold text-primary font-heading">{price}</span>
      {priceNote && <span className="text-sm text-muted-foreground ml-2">/ {priceNote}</span>}
    </div>
    <hr className="border-border mb-4" />
    <ul className="space-y-3 flex-1 mb-6">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <button
      className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      aria-label={`${ctaLabel} for ${name}`}
    >
      {ctaLabel}
    </button>
  </div>
);

export default React.memo(TicketCard);
