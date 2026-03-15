import React from "react";
import { Stat } from "@/types";

const StatBox: React.FC<Stat> = ({ value, label }) => (
  <div className="bg-card rounded-xl p-5 text-center shadow-sm border border-border">
    <p className="text-3xl font-bold text-primary font-heading">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

export default React.memo(StatBox);
