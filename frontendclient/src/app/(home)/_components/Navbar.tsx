"use client";

import { House, User, LogOut, MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LogoutDialog from "../_utils/confirmation";
import { useToken } from "@/hooks/TokenContext";

const Navbar = () => {
  const { push } = useRouter();
  const { token } = useToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoggedIn = !!token;

  const handleLogin = () => {
    push("/login");
  };

  useEffect(() => {
    if (!token) {
      toast("Please login to order food", { type: "info" });
    }
  }, [token]);

  return (
    <div className="w-full lg:w-[200px] h-[100px] lg:h-screen flex flex-row lg:flex-col bg-[rgb(33,25,34)] items-center py-4 px-2 lg:py-10 overflow-x-auto lg:overflow-y-hidden">
      <div className="flex flex-col items-center gap-1">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2101/2101264.png"
          alt="logo"
          width={100}
          height={100}
          className="mb-4"
        />
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
            className="text-white cursor-pointer w-6 h-6 hover:text-red-400 font-semibold hover:scale-110 transition-transform"
            onClick={() => push("/profile")}
          />
        </div>
        <div className="w-[80%] h-[80px] bg-transparent flex items-center justify-center rounded-lg">
          <MapPinned
            className="text-white cursor-pointer w-6 h-6 hover:text-red-400 font-semibold hover:scale-110 transition-transform"
            onClick={() => push("/location")}
          />
        </div>

        <div className="w-[80%] h-[80px] bg-transparent flex items-center justify-center rounded-lg">
          {isLoggedIn ? (
            <LogOut
              className="text-white cursor-pointer w-6 h-6 hover:text-red-400 font-semibold hover:scale-110 transition-transform"
              onClick={() => setIsDialogOpen(true)}
            />
          ) : (
            <button
              className="text-white cursor-pointer w-6 h-6 hover:text-red-400 font-semibold hover:scale-110 transition-transform"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <LogoutDialog closeDialog={() => setIsDialogOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
