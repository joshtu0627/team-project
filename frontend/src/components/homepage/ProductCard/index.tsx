import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Product from "../../../types/Product";

export default function ProductCard({ product }: { product: Product }) {

  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // 这里可以添加代码将收藏状态保存到本地存储或服务器
  };


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

        
        {/* <div className="flex my-2 mt-2 justify-left br ">
          {product.colors.length > 0 &&
            product.colors.map((color) => (
              <div
                key={color.code}
                className="w-6 h-6 mr-2 border border-black"
                style={{ backgroundColor: `#${color.code}` }}
              ></div>
            ))}
                      <button onClick={toggleFavorite} style={{ all: 'unset', cursor: 'pointer', marginRight: '0em' }}>
          {isFavorited ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
        </button>
        </div> */}
        <div className="flex my-2 mt-2 justify-left items-center">
          <div className="flex flex-grow"> {/* Flex container for color squares */}
            {product.colors.length > 0 &&
              product.colors.map((color) => (
                <div
                  key={color.code}
                  className="w-6 h-6 mr-2 border border-black"
                  style={{ backgroundColor: `#${color.code}` }}
                ></div>
              ))}
          </div>
          <button onClick={toggleFavorite} style={{ all: 'unset', cursor: 'pointer' }}>
            {isFavorited ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
          </button>
        </div>


        <div className="text-gray-500">{product.title}</div>
        <div className="text-gray-500">TWD:{product.price}</div>
      </div>
    </div>
  );
}
