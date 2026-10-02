import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Stars Align home">
      <span className="brand-mark" aria-hidden="true">✦</span>
      <span className="text-[0.9rem] font-semibold tracking-[0.1em]">
        <span className="text-white">STARS</span>
        <span className="text-sky-300">ALIGN</span>
      </span>
    </Link>
  );
}
