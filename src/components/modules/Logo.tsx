import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex h-full w-10 shrink-0 items-center">
      <Image
        className="h-full object-contain"
        src="/images/logo.png"
        alt="LOGO"
        width={100}
        height={100}
      />
    </Link>
  );
}
