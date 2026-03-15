import React from "react";
import { Speaker } from "@/types";
import { User } from "lucide-react";

const SpeakerCard: React.FC<Speaker> = ({ name, designation, company, imageUrl }) => {
  const [hasImageError, setHasImageError] = React.useState(false);

  return (
    <div className="group flex-shrink-0 w-full cursor-pointer overflow-hidden rounded-[2.5rem] bg-white transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
        {imageUrl && !hasImageError ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            onError={() => setHasImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <User className="w-20 h-20 text-muted-foreground/20" />
        )}
      </div>
      <div className="p-8 text-center bg-white">
        <h3 className="text-xl font-bold text-black font-heading mb-1">{name}</h3>
        <p className="text-sm text-gray-600 font-medium">
          {designation}
          {designation && company ? ", " : ""}
          {company}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SpeakerCard);
