import Image from "next/image";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <Image
      src="/logo-tactix.png"
      alt="TACTIX CPNS"
      width={36}
      height={36}
      className={`${className} object-contain`}
      priority
    />
  );
}

export function Wordmark({ className = "text-lg" }: { className?: string }) {
  return (
    <span
      className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${className}`}
    >
      TACTIX{" "}
      <span className="text-indigo-600 dark:text-indigo-400">
        CPNS
      </span>
    </span>
  );
}
