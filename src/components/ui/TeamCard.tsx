import React, { useState } from "react";
import { TeamMember } from "@/types";
import { User, Linkedin } from "lucide-react";
import { SafeLink } from "@/components/SafeLink";

const TeamCard: React.FC<TeamMember> = ({ name, role, imageUrl, linkedinUrl }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group flex-shrink-0 w-56 cursor-pointer text-center">
      <div className="relative aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden mb-4 mx-auto transition-all duration-300 group-hover:scale-105">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <User className="w-16 h-16 text-muted-foreground/40" />
        )}
        {linkedinUrl && (
          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
            <SafeLink
              href={linkedinUrl}
              aria-label={`${name}'s LinkedIn Profile`}
              className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset rounded-xl"
            >
              <Linkedin className="w-8 h-8 text-primary-foreground" />
            </SafeLink>
          </div>
        )}
      </div>
      <h3 className="font-bold text-foreground font-heading">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  );
};

export default React.memo(TeamCard);
