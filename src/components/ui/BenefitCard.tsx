import React from "react";
import { Benefit } from "@/types";
import { Users, Utensils, Gift } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Users,
  Utensils,
  Gift,
};

const BenefitCard: React.FC<Benefit> = ({ icon, title, description }) => {
  const IconComp = iconMap[icon] || Users;
  return (
    <div className="bg-primary rounded-xl p-6 text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
        <IconComp className="w-6 h-6" />
      </div>
      <h3 className="font-bold font-heading text-lg mb-2">{title}</h3>
      <p className="text-sm opacity-80 leading-relaxed">{description}</p>
    </div>
  );
};

export default React.memo(BenefitCard);
