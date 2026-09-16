import { useEffect, useRef } from "react";
import "./BeachScene.css";

export default function BeachScene() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (bgRef.current) {
        bgRef.current.style.transform = `
          scale(1.06)
          translate(${x * 4}px, ${y * 3}px)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="resort-background">
      <img
        ref={bgRef}
        src="/resort-bg.png"
        alt="Luxury beach resort"
        className="resort-bg-image"
      />

      <div className="wave-motion"></div>
      <div className="sunset-glow"></div>
      <div className="resort-overlay"></div>
    </div>
  );
}