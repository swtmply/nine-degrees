import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image
        src="/assets/logos/iconmark-white.svg"
        width={12}
        height={6}
        layout="responsive"
      />
      <Image
        src="/assets/logos/wordmark-white.svg"
        width={26}
        height={4}
        layout="responsive"
      />
    </>
  );
}
