import React, { useState, useEffect } from "react";

const ClickEffect = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    let idCounter = 0;

    const handleClick = (e) => {
      // Get click position relative to viewport
      const x = e.clientX;
      const y = e.clientY;

      const newElements = [];

      // 1. Spawning the expanding ring
      const ringId = `ring-${idCounter++}`;
      newElements.push({
        id: ringId,
        type: "ring",
        x,
        y,
      });

      // 2. Spawning 4-5 drifting particles (flowers, sparkles, petals)
      const symbols = ["🌸", "🏵️", "✨", "🌼", "🕉️"];
      const particleCount = 5;

      for (let i = 0; i < particleCount; i++) {
        const particleId = `part-${idCounter++}`;
        
        // Random angle and distance for the drift direction
        const angle = (i * (360 / particleCount) + Math.random() * 30) * (Math.PI / 180);
        const distance = 40 + Math.random() * 50; // pixels to drift
        
        const dx = `${Math.cos(angle) * distance}px`;
        const dy = `${Math.sin(angle) * distance}px`;
        const rot = `${(Math.random() - 0.5) * 180}deg`; // rotation
        const char = symbols[Math.floor(Math.random() * symbols.length)];

        newElements.push({
          id: particleId,
          type: "particle",
          x,
          y,
          dx,
          dy,
          rot,
          char,
        });
      }

      setElements((prev) => [...prev, ...newElements]);

      // Clean up after the animation completes (800ms)
      const idsToRemove = newElements.map((el) => el.id);
      setTimeout(() => {
        setElements((prev) => prev.filter((el) => !idsToRemove.includes(el.id)));
      }, 900);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {elements.map((el) => {
        if (el.type === "ring") {
          return (
            <div
              key={el.id}
              className="click-ring"
              style={{
                left: `${el.x}px`,
                top: `${el.y}px`,
              }}
            />
          );
        } else {
          return (
            <div
              key={el.id}
              className="click-particle"
              style={{
                left: `${el.x}px`,
                top: `${el.y}px`,
                "--dx": el.dx,
                "--dy": el.dy,
                "--rot": el.rot,
              }}
            >
              {el.char}
            </div>
          );
        }
      })}
    </>
  );
};

export default ClickEffect;
