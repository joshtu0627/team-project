import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import useWindowWidth from "../../../hooks/useWindowWidth";

import "./index.css";

export default function Header() {
  const [isMemberHover, setIsMemberHover] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartProducts, setCartProducts] = useState([]);

  const windowWidth = useWindowWidth();

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
      {windowWidth > 1280 ? (
        // desktop's header
        <div className="fixed top-0 z-50 w-full ">
          <header className="flex w-full h-20 py-5 text-black bg-white">
            {/* left side of the header */}
            <div className="flex items-center justify-center flex-1 cursor-pointer-bar">
              <Link to={"/all"}>
                <div className="w-40 mx-10">
                  <img src="/assets/images/icon-images/logo.png" alt="" />
                </div>
              </Link>
              <Link to={"/women"}>
                <div className="mx-5 animated-btn xl:ml-[3.5rem]">
                  {/* &nbsp; is for space */}
                  女&nbsp;&nbsp;&nbsp;裝
                </div>
              </Link>
              |
              <Link to={"/men"}>
                <div className="mx-5 animated-btn">男&nbsp;&nbsp;&nbsp;裝</div>
              </Link>
              |
              <Link to={"/accessories"}>
                <div className="mx-5 animated-btn">配&nbsp;&nbsp;&nbsp;件</div>
              </Link>
            </div>

            <div className="flex justify-end flex-1 mx-5 cursor-pointer-bar">
              <div className="relative">
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-full focus:outline-none"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                ></input>
                <Link to={`/search?keyword=${searchText}`}>
                  <div className="absolute inset-y-0 flex items-center pl-3 right-3">
                    <img
                      src="/assets/images/icon-images/search.png"
                      className="object-cover object-center icon-size"
                      alt=""
                    />
                  </div>
                </Link>
              </div>

              <div
                onMouseEnter={() => setIsCartHover(true)}
                onMouseLeave={() => setIsCartHover(false)}
                className="relative flex items-center mx-3"
              >
                <Link to={"/cart"}>
                  <img
                    src={
                      isCartHover
                        ? "/assets/images/icon-images/cart-hover.png"
                        : "/assets/images/icon-images/cart.png"
                    }
                    className="object-cover object-center icon-size"
                    alt=""
                  />
                  <div className="absolute right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full bottom-1">
                    {cartProducts.length}
                  </div>
                </Link>
              </div>

              <div
                onMouseEnter={() => setIsMemberHover(true)}
                onMouseLeave={() => setIsMemberHover(false)}
                className="flex items-center mx-3"
              >
                <img
                  src={
                    isMemberHover
                      ? "/assets/images/icon-images/member-hover.png"
                      : "/assets/images/icon-images/member.png"
                  }
                  className="object-cover object-center icon-size"
                  alt=""
                />
              </div>
            </div>
          </header>
          <div className="z-50 flex items-center w-full h-8 text-sm text-white text-gray-400 bg-black cursor-pointer-bar"></div>
        </div>
      ) : (
        <>
          <div className="fixed top-0 z-50 w-full ">
            <header className="flex h-20 py-5 text-black bg-white">
              {/* left side of the header */}
              {!isSearching && (
                <div className="flex items-center justify-center flex-1 cursor-pointer-bar">
                  <Link to={"/all"}>
                    <div className="w-40 mx-10">
                      <img src="/assets/images/icon-images/logo.png" alt="" />
                    </div>
                  </Link>
                </div>
              )}

              <div
                className="inset-y-0 top-0 flex items-center pl-3 mr-5 right-3"
                onClick={() => {
                  setIsSearching(!isSearching);
                }}
              >
                {!isSearching && (
                  <img
                    src="/assets/images/icon-images/search.png"
                    className="object-cover object-center icon-size"
                    alt=""
                  />
                )}
              </div>

              {isSearching && (
                <div className="flex items-center justify-center flex-1">
                  <div
                    className="m-2"
                    onClick={() => {
                      setIsSearching(false);
                    }}
                  >
                    <RxCross1 />
                  </div>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-full focus:outline-none"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    style={{ width: "60vw" }}
                  ></input>
                  <Link to={`/search?keyword=${searchText}`}>
                    <div className="m-2">
                      <img
                        src="/assets/images/icon-images/search.png"
                        className="object-cover object-center mr-5 icon-size"
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </Link>
                </div>
              )}

              {/* right side of the header */}
            </header>

            <div className="flex items-center justify-center h-8 text-sm text-white text-gray-400 bg-black cursor-pointer-bar">
              <Link to={"/women"}>
                <div
                  className="pr-10"
                  style={{ borderRight: "1px solid white" }}
                >
                  女&nbsp;&nbsp;&nbsp;裝
                </div>
              </Link>
              <Link to={"/men"}>
                <div
                  className="pr-10 ml-10"
                  style={{ borderRight: "1px solid white" }}
                >
                  男&nbsp;&nbsp;&nbsp;裝
                </div>
              </Link>
              <Link to={"/accessories"}>
                <div className="pr-10 ml-10">配&nbsp;&nbsp;&nbsp;件</div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
