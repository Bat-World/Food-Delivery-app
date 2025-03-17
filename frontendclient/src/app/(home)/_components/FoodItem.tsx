const FoodItem = ({ food, onClick }: any) => (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
      <img
        src={food.image || "https://via.placeholder.com/400x400"}
        alt={food.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute right-6 bottom-20 bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
        <Plus className="text-white" onClick={onClick} />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{food.name}</h2>
        <p className="text-gray-600 mt-2">{food.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-semibold text-gray-900">${food.price}</p>
        </div>
      </div>
    </div>
  );
  
  export default FoodItem;
  