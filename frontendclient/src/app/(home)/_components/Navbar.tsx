"use client";

import { House, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { push } = useRouter();

  return (
    <div className="w-[200px] h-screen bg-[rgb(33,25,34)] flex flex-col items-center py-10 overflow-y-hidden">
      <div className="flex flex-col items-center gap-1">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2101/2101264.png"
          alt="logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <p className="  text-white font-semibold text-xl">POSFood</p>
      </div>

      <div className="h-[40vh] w-[80%] flex flex-col items-center justify-between gap-4 mt-20">
        <div className="w-[80%] h-[80px] bg-red-400 flex items-center justify-center rounded-lg">
          <House
            className="text-white cursor-pointer w-6 h-6"
            onClick={() => push("/")}
          />
        </div>
        <div className="w-[80%] h-[80px] bg-transparent flex items-center justify-center rounded-lg">
          <User
            className="text-white cursor-pointer w-6 h-6"
            onClick={() => push("/profile")}
          />
        </div>
        <div className="w-[80%] h-[80px] bg-transparent flex items-center justify-center rounded-lg">
          {" "}
          <LogOut
            className="text-white cursor-pointer w-6 h-6"
            onClick={() => push("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
