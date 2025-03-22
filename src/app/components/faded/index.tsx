import { useState, useEffect, ReactNode } from "react";

interface FadedProps {
  children: ReactNode;
}

const Faded: React.FC<FadedProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return <div className={loaded ? "fade-in" : "hidden"}>{children}</div>;
};

export default Faded;
