import { useRouter } from "next/router";
import React from "react";

export default function SubsectionPage() {
  const router = useRouter();

  return <div>{router.query.subsection}</div>;
}
