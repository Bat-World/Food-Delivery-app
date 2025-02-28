"use client";
import { useState } from "react";
import { CircleUser, ShoppingCart } from "lucide-react";
import Image from "next/image";

const Homepage = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-black relative">
        <h1 className="text-2xl text-white">NomNom</h1>
        <div className="flex space-x-4 relative">
          <div 
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <CircleUser className="text-white cursor-pointer" />
            
            {/* Hover Info */}
            <div
              className={`absolute right-0 top-10 w-48 p-4 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out 
                ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
            >
              <h4 className="font-bold text-gray-800">John Doe</h4>
              <p className="text-sm text-gray-600">johndoe@example.com</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600">
                Logout
              </button>
            </div>
          </div>
          <ShoppingCart className="text-white cursor-pointer" />
        </div>
      </header>
      <Image
        src="/banner.png"
        alt="Banner"
        layout="responsive"
        width={400}
        height={100}
      />
      <div className="w-full h-[80vw] bg-white"></div>
      <footer className="bg-black p-6 text-center text-gray-500">
        <p>© 2025 NomNom LLC</p>
      </footer>
    </div>
  );
};

export default Homepage;
