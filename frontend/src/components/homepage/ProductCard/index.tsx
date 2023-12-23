import { Link } from "react-router-dom";

import Product from "../../../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center justify-between m-3">
      <div className="flex flex-col justify-center w-full h-full">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.main_image}
            className="object-cover w-full h-full transition-transform duration-300 cursor-pointer hover:scale-110 hover:shadow-2xl"
          ></img>
        </Link>
      </div>
      <div>
        <div className="flex my-2 mt-2 justify-left br ">
          {product.colors.length > 0 &&
            product.colors.map((color) => (
              <div
                key={color.code}
                className="w-6 h-6 mr-2 border border-black"
                style={{ backgroundColor: `#${color.code}` }}
              ></div>
            ))}
        </div>
        <div className="text-gray-500">{product.title}</div>
        <div className="text-gray-500">TWD:{product.price}</div>
      </div>
    </div>
  );
}
