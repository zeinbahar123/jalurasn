export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-indigo-600" />
      <path
        d="M8 21.5 13.2 12l3.4 6 2.3-3.6L24 21.5"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="10.5" r="2.6" className="fill-amber-400" />
    </svg>
  );
}

export function Wordmark({ className = "text-lg" }: { className?: string }) {
  return (
    <span
      className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${className}`}
    >
      Jalur<span className="text-indigo-600 dark:text-indigo-400">ASN</span>
    </span>
  );
}
