import { useContext, useMemo } from "react";
import LightRays from "./../ui/LightRays.jsx";
import { themeContext } from "./../../context/themeContext.jsx";

const GlobalBackground = () => {
  const { theme } = useContext(themeContext);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none isolate">
      <LightRays
        raysOrigin="top-center"
        raysColor={theme === 1 ? "#ffffff" : "#000000"}
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
      />
    </div>
  );
};

export default GlobalBackground;
