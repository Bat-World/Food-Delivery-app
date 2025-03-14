import { CircleUser, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = ({ userData, onCartClick }: any) => {
  const [hovered, setHovered] = useState(false);
  const { push } = useRouter();

  return (
    <header className="flex justify-between items-center p-4 bg-black relative">
      <h1 className="text-2xl text-white">NomNom</h1>
      <div className="flex space-x-4 relative">
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CircleUser
            className="text-white cursor-pointer"
            onClick={() => push("/profile")}
          />
          <div
            className={`absolute right-0 top-10 w-48 p-4 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out 
              ${
                hovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <p className="text-sm text-gray-600">{userData.email}</p>
            <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600">
              Logout
            </button>
          </div>
        </div>
        <ShoppingCart
          className="text-white cursor-pointer"
          onClick={onCartClick}
        />
      </div>
    </header>
  );
};

export default Header;
