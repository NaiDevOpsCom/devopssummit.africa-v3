import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  pill?: string;
  light?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  pill,
  light,
  className = "",
}) => (
  <div className={`text-center mb-12 ${className}`}>
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className={`h-[1px] flex-1 max-w-[100px] ${light ? "bg-white/30" : "bg-primary/30"}`} />
      <h2
        className={`text-3xl md:text-5xl font-bold font-heading tracking-tight ${light ? "text-pure-white" : "text-pure-black"}`}
      >
        {title}
      </h2>
      <div className={`h-[1px] flex-1 max-w-[100px] ${light ? "bg-white/30" : "bg-primary/30"}`} />
    </div>

    {pill && (
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center justify-center h-full">
          <div
            className={`w-full max-w-[400px] h-[1px] ${light ? "bg-white/30" : "bg-primary/30"}`}
          />
        </div>
        <span className="relative z-10 inline-block px-6 py-2 rounded-full bg-brand-cyan text-black text-sm font-bold uppercase tracking-wider">
          {pill}
        </span>
      </div>
    )}

    {subtitle && (
      <p
        className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${light ? "text-white/80" : "text-pure-black/70"}`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default React.memo(SectionHeader);
