"use client";

import { Suspense } from "react";
import Homepage from "./Homepage"; 

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading page...</div>}>
      <Homepage />
    </Suspense>
  );
}
