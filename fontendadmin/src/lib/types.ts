export type Food = {
  id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

export type Order = {
  _id: string;
  totalPrice: number;
  status: string;
  user?: {
    email: string;
  };
  foodOrderItems: {
    quantity: number;
  }[];
};
