'use client'

import Navbar from "./_components/Navbar";
import Order from "./_components/Order";
import { Categories } from "./_components/Categories";
import { Foods } from "./_components/Foods";


const Homepage = () => {

  return (
    <div className="flex flex-row h-screen">
      <Navbar />

      <div style={{ backgroundColor: '#0F0F0F' }} className="w-full flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Categories />
        </div>
        <div className="flex-grow overflow-y-auto mt-4">
          <Foods />
        </div>
      </div>

      <div className="flex-shrink-0 w-[500px]">
        <Order />
      </div>
    </div>
  );
};

export default Homepage;
