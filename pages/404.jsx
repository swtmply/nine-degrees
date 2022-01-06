import Image from "next/image";
import React from "react";

export default function Custom404() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Image
        src="/assets/icons/404 not found symbol.png"
        width={512}
        height={256}
      />
      <h1 className="font-mono text-redtagging font-bold text-3xl">
        this isn't about you, this is about me
      </h1>
      <p className="text-redtagging text-xl">
        we can still fix this, i hope you can give me another chance
      </p>
    </div>
  );
}
