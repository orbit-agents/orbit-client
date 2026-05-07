type IconProps = { size?: number };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Download arrow + ground line
export function DownloadIcon({ size = 13 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 2v9M4 7l4 4 4-4M3 14h10" />
    </svg>
  );
}

// Right arrow
export function ArrowRight({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// Map / canvas / dms / squads / tasks / runs (sidebar icons)
export function MapIcon({ size = 10 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M2 4l4-1 4 1 4-1v9l-4 1-4-1-4 1V4zM6 3v9M10 4v9" />
    </svg>
  );
}
export function CanvasIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 2l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11l6 3 6-3" />
    </svg>
  );
}
export function DmsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M6 2L4 14M12 2l-2 12M2 6h12M2 10h12" />
    </svg>
  );
}
export function SquadsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M5 7a2 2 0 100-4 2 2 0 000 4zM11 7a2 2 0 100-4 2 2 0 000 4zM2 13c0-2 1.5-3 3-3s3 1 3 3M8 13c0-2 1.5-3 3-3s3 1 3 3" />
    </svg>
  );
}
export function TasksIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M9 2L3 9h4l-1 5 6-7H8l1-5z" />
    </svg>
  );
}
export function RunsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M4 3v10M4 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 6c0 3-4 2-4 5" />
    </svg>
  );
}

// Tool-call icons used in chat preview (always green)
export function GitIcon({ size = 11 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth={1.6}>
      <path d="M4 3v10M4 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 6.5c0 3-4 2-4 4.5" />
    </svg>
  );
}
export function ShellIcon({ size = 11 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth={1.6}>
      <path d="M2 3h12v10H2zM4.5 6.5L7 8.5 4.5 10.5" />
    </svg>
  );
}
export function CheckIcon({ size = 11, color = "#4ade80" }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M3 8l3 3 6-6" />
    </svg>
  );
}

// Apple logo
export function AppleIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

// Windows logo (four-pane glyph)
export function WindowsIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5.5L11 4v7H3V5.5zM12 3.85L21 2.5V11h-9V3.85zM3 12h8v7L3 17.5V12zm9 0h9v8.5L12 19v-7z" />
    </svg>
  );
}

// Linux glyph (the prototype's placeholder shape)
export function LinuxIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.62 8.35c-.42-.6-.85-1.5-.85-2.45 0-1.95-1.04-3.45-2.62-4.45-.46-.3-1.04-.45-1.62-.45-1.04 0-2.04.45-2.7 1.2-.66-.75-1.66-1.2-2.7-1.2-.58 0-1.16.15-1.62.45C.94 2.45-.1 3.95-.1 5.9c0 .95.43 1.85.85 2.45-.42.6-.85 1.5-.85 2.45 0 1.95 1.04 3.45 2.62 4.45.46.3 1.04.45 1.62.45 1.04 0 2.04-.45 2.7-1.2.66.75 1.66 1.2 2.7 1.2.58 0 1.16-.15 1.62-.45 1.58-1 2.62-2.5 2.62-4.45 0-.95-.43-1.85-.85-2.45zM7.05 14.85c-.66.75-1.66 1.2-2.7 1.2-.58 0-1.16-.15-1.62-.45C1.15 14.6.1 13.1.1 11.15c0-.95.43-1.85.85-2.45-.42-.6-.85-1.5-.85-2.45 0-1.95 1.05-3.45 2.63-4.45.46-.3 1.04-.45 1.62-.45 1.04 0 2.04.45 2.7 1.2v12.3z" transform="translate(4 2)" />
    </svg>
  );
}
