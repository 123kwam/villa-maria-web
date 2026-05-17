export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 8"
      width="56"
      height="8"
      className={`text-vm-red ${className}`}
    >
      <line x1="0" y1="4" x2="22" y2="4" stroke="currentColor" strokeWidth="1" />
      <rect
        x="26"
        y="2"
        width="4"
        height="4"
        fill="currentColor"
        transform="rotate(45 28 4)"
      />
      <line x1="34" y1="4" x2="56" y2="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
