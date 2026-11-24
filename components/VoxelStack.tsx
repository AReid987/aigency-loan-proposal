"use client";

import { useReducedMotion } from "framer-motion";

/**
 * A stack of CSS-3D voxel cubes with glowing amber/magenta edges,
 * echoing the Unicorn Studio "Voxel Cube Stack" reference.
 * Pure CSS animation (GPU-composited), respects reduced-motion.
 */
export function VoxelStack({
  size = 54,
  cols = 3,
  rows = 3,
  layers = 3,
}: {
  size?: number;
  cols?: number;
  rows?: number;
  layers?: number;
}) {
  const reduce = useReducedMotion();
  const cubes: React.ReactNode[] = [];
  const gap = size * 0.14;
  const step = size + gap;

  for (let l = 0; l < layers; l++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // pyramid-ish: skip some corners on outer layers for a stacked look
        if (l === layers - 1 && (c === 0 || c === cols - 1) && (r === 0 || r === rows - 1)) continue;
        const x = (c - (cols - 1) / 2) * step;
        const y = (l - (layers - 1) / 2) * step;
        const z = (r - (rows - 1) / 2) * step;
        const hueShift = (c + r + l) % 3;
        const border =
          hueShift === 0
            ? "rgba(255,211,107,0.6)"
            : hueShift === 1
            ? "rgba(255,179,71,0.5)"
            : "rgba(232,121,199,0.45)";
        cubes.push(
          <div
            key={`${l}-${r}-${c}`}
            className="voxel-cube"
            style={{
              transform: `translate3d(${x}px, ${y}px, ${z}px)`,
              ["--s" as string]: `${size}px`,
            }}
          >
            {["f-front", "f-back", "f-right", "f-left", "f-top", "f-bottom"].map((f) => (
              <div
                key={f}
                className={`face ${f}`}
                style={{ borderColor: border }}
              />
            ))}
          </div>
        );
      }
    }
  }

  return (
    <div className="voxel-stage" aria-hidden>
      <div
        className="voxel-stack"
        style={reduce ? { animation: "none" } : undefined}
      >
        {cubes}
      </div>
    </div>
  );
}