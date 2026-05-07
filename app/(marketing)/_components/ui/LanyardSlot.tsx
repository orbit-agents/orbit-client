"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => null,
});

interface LanyardSlotProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function LanyardSlot({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  className,
  style,
}: LanyardSlotProps) {
  return (
    <div className={className} style={style}>
      <Lanyard
        position={position}
        gravity={gravity}
        fov={fov}
        transparent={transparent}
      />
    </div>
  );
}
