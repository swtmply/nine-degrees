import { useRouter } from "next/router";
import React from "react";

export default function CategoryPage() {
  const router = useRouter();

  return <div>{router.query.category}</div>;
}
