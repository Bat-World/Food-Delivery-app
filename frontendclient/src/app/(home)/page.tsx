import Navbar from "./_components/Navbar";
import Order from "./_components/Order";
import { Categories } from "./_components/Categories";
import { Foods } from "./_components/Foods";
import { Suspense } from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
    <Navbar />
  
    <div className="flex flex-col flex-grow overflow-y-auto bg-[#0F0F0F]">
      <div className="sticky top-0 z-10">
        <Categories />
      </div>
      <div className="flex-grow overflow-y-auto mt-4">
        <Suspense fallback={<div>Loading foods...</div>}>
          <Foods />
        </Suspense>
      </div>
    </div>
  
    <div className="w-full lg:w-[30vw]">
      <Order />
    </div>
  </div>
  
  );
};

export default Homepage;
