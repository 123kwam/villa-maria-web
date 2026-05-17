"use client";

type Props = { label: string };

export function PrintButton({ label }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex items-center gap-3 font-label text-xs uppercase tracking-widest text-vm-red"
    >
      <span aria-hidden className="block h-px w-0 bg-vm-red transition-all duration-300 group-hover:w-8" />
      <span className="relative">
        <span>{label}</span>
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-vm-red transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </button>
  );
}
