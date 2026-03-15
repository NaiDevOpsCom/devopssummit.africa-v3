import React from "react";

const Loading: React.FC = () => (
  <div
    className="fixed inset-0 flex items-center justify-center bg-background z-[100]"
    role="status"
  >
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading summit experience...
      </p>
    </div>
  </div>
);

export default Loading;
