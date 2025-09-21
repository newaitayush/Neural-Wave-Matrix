import React, { useEffect, useRef, useState } from "react";

export default function Grid({ 
  rows = 15, 
  cols = 20, 
  speed = 160, 
  running = true, 
  cellSize = 22 
}) {
  const [waveCol, setWaveCol] = useState(0);
  const [hue, setHue] = useState(200);
  const [dir, setDir] = useState(1);

  const dirRef = useRef(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!running) return;

    timerRef.current = setInterval(() => {
      setWaveCol((prev) => {
        let next = prev + dirRef.current;
        if (next >= cols - 1 || next <= 0) {
          dirRef.current = -dirRef.current;
          setDir(dirRef.current);
        }
        return next;
      });

      setHue((prev) => (prev + 2) % 360);
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [speed, cols, running]);

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Reversed brightness: bright ahead, dull behind
      let dist = dir > 0 ? waveCol - c : c - waveCol;
      if (dist < 0) dist = Infinity;

      const intensity = Math.max(0, 1 - dist / 5);
      const power = Math.pow(intensity, 1.5);
      const alpha = power * 0.9;
      
      const bg = intensity > 0
        ? `hsla(${hue}, 100%, ${35 + power * 50}%, ${alpha})`
        : "#0a0a0a";

      const glow = intensity > 0
        ? `0 0 ${Math.max(3, power * 18)}px hsla(${hue}, 100%, 60%, ${alpha})`
        : "none";

      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            width: cellSize,
            height: cellSize,
            background: bg,
            boxShadow: glow,
            transition: "all 120ms linear",
            borderRadius: 2,
            border: intensity > 0.1 ? `1px solid hsla(${hue}, 80%, 60%, 0.3)` : "1px solid #1a1a1a"
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: 1,
        padding: 20,
        background: "radial-gradient(circle at center, #0f0f0f 0%, #000 100%)",
        borderRadius: 12,
        border: "2px solid #00ffff20",
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 255, 255, 0.05)"
      }}
    >
      {cells}
    </div>
  );
}