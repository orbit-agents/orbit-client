export function BrandMark({
  size = 22,
  simple = false,
}: {
  size?: number;
  simple?: boolean;
}) {
  if (simple) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <g transform="translate(16 16) rotate(30)">
          <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="#a0a0a0" strokeWidth={2} />
        </g>
        <g transform="translate(16 16) rotate(-30)">
          <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="#7ec891" strokeWidth={2} />
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="rgA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e8e8e8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8e8e8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="rgB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec891" stopOpacity="0.05" />
          <stop offset="45%" stopColor="#7ec891" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7ec891" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <g transform="translate(16 16) rotate(30)">
        <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="url(#rgA)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <g transform="translate(16 16) rotate(-30)">
        <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="url(#rgB)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <circle cx={22} cy={11} r={1.4} fill="#7ec891" />
    </svg>
  );
}
