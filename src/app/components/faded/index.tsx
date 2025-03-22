"use client";

import { useState, useEffect, ReactNode } from "react";

interface FadedProps {
  children: ReactNode;
}

const Faded: React.FC<FadedProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default Faded;
