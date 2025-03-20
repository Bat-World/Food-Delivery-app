import { sendRequest } from "@/lib/send-request";

export const getFoods = async () => {
       try {
          const categoryResponse = await sendRequest.get("/food/category");
          const foodsResponse = await sendRequest.get("/food");
        //   const categoryResponse = categoryResponse.data;
        //   const foodsResponse = foodsResponse.data;
          return { categoryResponse, foodsResponse };
        //   setCategories(categoryResponse.data);
        //   setFoodsData(foodsResponse.data);
        //   setFilteredFoods(foodsResponse.data);
        } catch (error) {
          console.error(error);
        }
}