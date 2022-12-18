export type Product = {
  id: number;
  shop: Shop;
  name: string;
  price: number;
  description: string;
  extra_info: string;
  section: Section;
  stock: 200;
  main_image: string;
  extra_images: any[];
  rating: number;
  quantity?: number;
};

type Shop = {
  id: 3;
  created: string;
  updated: string;
  approved: false;
  name: string;
  description: string;
  logo: string;
  cover: string;
  user_id: string;
  fixed_delivery: boolean;
  fixed_delivery_cost: boolean;
  delivery_cost: number;
  location: number;
};

type Section = {
  id: number;
  created: string;
  updated: string;
  es_name: string;
  en_name: string;
  icon: null | string;
  cover: null | string;
  department: number;
};

export type ProductType = {
  products: Product[];
};
