"use client";

import { useEffect } from "react";

export default function Home() {
  const getFoods = async () => {
    const dsa = await (await fetch("http://localhost:9000/food")).json();

    console.log(dsa);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return <div className="flex justify-start items-start">amdin page</div>;
}
