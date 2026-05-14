type Props = {
  children: React.ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center uppercase tracking-[0.18em] text-sm font-medium font-label text-vm-smoke before:content-[''] before:block before:h-px before:w-12 before:bg-current before:mr-4";

export function Eyebrow({ children, className = "" }: Props) {
  return <span className={`${base} ${className}`}>{children}</span>;
}
