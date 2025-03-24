import Navbar from "./_components/Navbar";
import Order from "./_components/Order";
import { Categories } from "./_components/Categories";
import { Foods } from "./_components/Foods";

const Homepage = () => {
  return (
    <div className="flex flex-row overflow-y-hidden">
      <Navbar />
      <div className="bg-black">
        {/* Categories Section */}
        <Categories />

        {/* Foods Section */}
        <Foods />
      </div>

      <Order />
    </div>
  );
};

export default Homepage;
