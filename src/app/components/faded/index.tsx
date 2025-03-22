"use client";

import { useState, useEffect } from "react";

const Faded = ({ children }) => {
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
