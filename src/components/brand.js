import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="text-2xl font-black tracking-[0.12em]" aria-label="Stars Align home">
      <span className="text-white">STARS</span>
      <span className="text-violet-500">ALIGN</span>
    </Link>
  );
}
