"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const NomNomPage = () => {

  const router = useRouter();

  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black">
        <h1 className="text-2xl">NomNom</h1>
        <div className="flex space-x-4">
          <button className="bg-red-600 px-4 py-2 rounded" onClick={() => router.push('/signup')}>sign up</button>
          <button className="bg-gray-800 px-4 py-2 rounded" onClick={() => router.push('/login')}>login</button>
        </div>
      </header>
      <div className='w-full h-[80vw] bg-white'></div>

      {/* Banner */}
      {/* <section className="relative text-center p-10 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200')" }}>
        <h2 className="text-5xl font-bold">Today's Steak Society Offer!</h2>
        <button className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg">Order Now</button>
      </section> */}

      {/* Categories */}
      {/* <nav className="flex justify-center space-x-4 p-4 bg-gray-800">
        <button className="text-red-500">Appetizer</button>
        <button>Salads</button>
        <button>Pizzas</button>
        <button>Lunch favorites</button>
        <button>Main dishes</button>
        <button>Fish & Sea food</button>
        <button>Side dish</button>
        <button>Desserts</button>
      </nav> */}

      {/* Food Items */}
      {/* <section className="p-4 grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/300" alt="Food" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">Sunshine Stackers</h3>
              <p className="text-gray-600">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-red-600 text-xl">$12.99</span>
                <button className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">+</button>
              </div>
            </div>
          </div>
        ))}
      </section> */}

      {/* Footer */}
      <footer className="bg-black p-6 text-center text-gray-500">
        <p>© 2025 NomNom LLC</p>
      </footer>
    </div>
  );
};

export default NomNomPage;
