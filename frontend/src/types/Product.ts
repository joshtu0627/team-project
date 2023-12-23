interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  texture: string;
  wash: string;
  place: string;
  note: string;
  story: string;
  colors: {
    code: string;
    name: string;
  }[];
  sizes: string[];
  variants: {
    color_code: string;
    size: string;
    stock: number;
  }[];
  main_image: string;
  images: string[];
}

export default Product;
