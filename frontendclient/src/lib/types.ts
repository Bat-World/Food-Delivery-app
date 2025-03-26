export type FoodCategory = {
  _id: string;
  categoryName: string;
};

export type Food = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  quantity?: number;
};

export type OrderType = {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  foodOrderItems: {
    food: {
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
};

export type CartType = {
  [_key: string]: {
    quantity: number;
  } & Food;
};


export  interface UserData {
  email: string;
  role: string;
  isVerified: boolean;
  orderedFoods: {
    _id: string;
    status: string;
    totalPrice: number;
    foodOrderItems: {
      food: {
        name: string;
        price: number;
        image: string;
      };
      quantity: number;
    }[];
  }[];
}

