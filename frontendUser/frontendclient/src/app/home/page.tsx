"use client";
import { useState } from "react";
import { CircleUser, ShoppingCart } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";

const Homepage = () => {
  const [hovered, setHovered] = useState(false);
  interface Food {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }

  const [foodsData, setFoodsData] = useState<Food[]>([]);


  const fetchFoods = async () => {

    try {
      const response = await axios.get("http://localhost:9000/food");
      console.log(response);
      setFoodsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);
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
      <div className="w-full h-[80vw] bg-white">
        <div className="flex flex-wrap justify-center gap-6">
        {foodsData.length === 0 ? (
          <p className="text-lg text-center text-gray-600">Loading...</p>
        ) : (
          foodsData.map((food) => (
            <div
              key={food.id}
              className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={food.image || "https://via.placeholder.com/400x300"}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{food.name}</h2>
                <p className="text-gray-600 mt-2">{food.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-semibold text-gray-900">${food.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
     
      </div>
      <footer className="bg-black p-6 text-center text-gray-500">
        <p>© 2025 NomNom LLC</p>
      </footer>
    </div>
  );
};

export default Homepage;
