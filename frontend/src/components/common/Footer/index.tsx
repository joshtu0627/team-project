import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useWindowWidth from "../../../hooks/useWindowWidth";

export default function Footer() {
  const windowWidth = useWindowWidth();

  const [cartProducts, setCartProducts] = useState([]);

  const storage = window.localStorage;

  useEffect(() => {
    const handleStorageChange = () => {
      setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
    };
    handleStorageChange();
    window.addEventListener("customStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("customStorageChange", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="flex-grow"></div>
      {windowWidth > 1280 ? (
        <footer
          //  desktop's footer
          className="flex items-center justify-center h-24 py-5 text-xs text-gray-200 bg-gray-900"
          style={{ color: "#D3D3D3" }}
        >
          <div className="flex mx-10" style={{ marginRight: "5vh" }}>
            <div className="pr-5" style={{ borderRight: "1px solid #D3D3D3" }}>
              <a href="/">關於 STYLiSH</a>
            </div>
            <div className="pr-5 ml-5 border-r border-gray-300">
              <a href="/">服務條款</a>
            </div>
            <div className="pr-5 ml-5 border-r border-gray-300">
              <a href="/">隱私政策</a>
            </div>
            <div className="pr-5 ml-5">
              <a href="/">聯絡我們</a>
            </div>
            <div className="pr-5 ml-5 ">
              <a href="/">FAQ</a>
            </div>
          </div>

          <div className="flex ml-4">
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/line.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/twitter.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/facebook.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center ml-5 text-center text-gray-500">
              @ 2018, All rights reserved.{" "}
            </div>
          </div>
        </footer>
      ) : (
        // mobile's footer
        <footer className="h-auto text-xs text-gray-200 bg-gray-900">
          <div className="flex py-5">
            <div className="flex w-3/5">
              <div className="flex-1 text-center">
                <div className="mb-3">
                  <a href="#">關於 STYLiSH</a>
                </div>
                <div className="mb-3">
                  <a href="#">服務條款</a>
                </div>
                <div className="mb-3">
                  <a href="#">隱私政策</a>
                </div>
              </div>
              <div className="flex-1 text-center ">
                <div className="mb-3">
                  <a href="#">聯絡我們</a>
                </div>
                <div className="mb-3">
                  <a href="#">FAQ</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-2/5">
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/line.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/twitter.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/facebook.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="ml-5 text-center text-gray-500">
            @ 2018, All rights reserved.{" "}
          </div>
          <div className="flex">
            <div className="flex items-center justify-center flex-1 p-4 text-center">
              <Link to={"/cart"}>
                <div className="relative">
                  <img
                    src="/assets/images/icon-images/cart.png"
                    className="brightness-5"
                  ></img>
                  <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-black text-white bg-red-500 rounded-full bottom-1">
                    {cartProducts.length}
                  </div>
                </div>

                <div>購物車</div>
              </Link>
            </div>

            <div className="flex items-center justify-center flex-1 p-4 text-center">
              <img
                src="/assets/images/icon-images/member.png"
                className="brightness-5"
              ></img>
              <div>會員</div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
