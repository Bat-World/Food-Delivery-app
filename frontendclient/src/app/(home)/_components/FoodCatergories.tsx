const FoodCategories = ({ categories, setSelectedCategory }: any) => (
    <div className="flex justify-center space-x-4 mt-10">
      <button
        onClick={() => setSelectedCategory(null)}
        className="bg-gray-500 text-white py-2 px-4 rounded-lg"
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          key={category._id}
          onClick={() => setSelectedCategory(category._id)}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
  
  export default FoodCategories;
  