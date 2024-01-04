import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import CartProduct from "../types/CartProduct";

import useWindowWidth from "../hooks/useWindowWidth";
import { backendurl } from "../constants/urls";
import { useUser } from "../contexts/UserContext";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  send_time: string;
}

export default function CartPage() {
  const windowWidth = useWindowWidth();
  const { user } = useUser();

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    send_time: "",
  });

  const [payTime, setPayTime] = useState<string>("");

  const [total, setTotal] = useState(0);

  const [userCoupon, setUserCoupon] = useState([]);

  const [selectedCoupon, setSelectedCoupon] = useState(-1);

  const [openCouponSelect, setOpenCouponSelect] = useState(false);

  const storage = window.localStorage;

  useEffect(() => {
    TPDirect.setupSDK(
      12348,
      "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
      "sandbox"
    );
    TPDirect.card.setup({
      // Display ccv field
      fields: {
        number: {
          // css selector
          element: "#card-number",
          placeholder: "**** **** **** ****",
        },
        expirationDate: {
          // DOM object
          element: document.getElementById("card-expiration-date"),
          placeholder: "MM / YY",
        },
        ccv: {
          element: "#card-ccv",
          placeholder: "ccv",
        },
      },

      styles: {
        // Style all elements
        input: {
          color: "gray",
        },
        // Styling ccv field
        "input.ccv": {
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        "input.expiration-date": {
          // 'font-size': '16px'
        },
        // Styling card-number field
        "input.card-number": {
          // 'font-size': '16px'
        },
        // style focus state
        ":focus": {
          // 'color': 'black'
        },
        // style valid state
        ".valid": {
          color: "green",
        },
        // style invalid state
        ".invalid": {
          color: "red",
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        "@media screen and (max-width: 400px)": {
          input: {
            color: "orange",
          },
        },
      },
      // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11,
      },
    });
    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }, []);

  useEffect(() => {
    function countTotal() {
      let total = 0;
      cartProducts.forEach((product) => {
        total += product.price * product.qty;
      });
      setTotal(total);
    }
    countTotal();
  }, [cartProducts]);

  useEffect(() => {
    if (!user) return;
    fetch(`${backendurl}/api/1.0/user/checkReward?user_id=${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data", data);
        setUserCoupon(data.reward);
      });
  }, [user]);

  function deleteProduct(id: number, color_name: string, size: string) {
    console.log("id", id);

    storage.setItem(
      "cart",
      JSON.stringify(
        cartProducts.filter((product) => {
          return (
            product.product_id !== id ||
            product.color_name !== color_name ||
            product.size !== size
          );
        })
      )
    );
    const event = new Event("customStorageChange");
    window.dispatchEvent(event);
    console.log();

    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }

  function setAmount(amount: number, id: number) {
    const newCartProducts = cartProducts.map((product) => {
      if (product.product_id === id) {
        return { ...product, qty: amount };
      } else {
        return product;
      }
    });

    storage.setItem("cart", JSON.stringify(newCartProducts));
    const event = new Event("customStorageChange");
    window.dispatchEvent(event);
    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }

  function createPayment() {
    // set pay time
    setPayTime(new Date().toLocaleString());

    // check input fields are vaild
    if (
      !userFormData.name ||
      !userFormData.phone ||
      !userFormData.address ||
      !userFormData.send_time
    ) {
      alert("請填寫完整資料");
      return;
    }

    if (!/^\d{10}$/.test(userFormData.phone)) {
      alert("手機號碼格式錯誤");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userFormData.email)) {
      alert("email格式錯誤");
      return;
    }

    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }
    TPDirect.card.getPrime((result) => {
      if (result.status !== 0) {
        console.error("獲取 Prime 失敗:", result.msg);
        return;
      }
      const prime = result.card.prime;
      console.log("prime", prime);
      // 使用 prime 進行支付流程，例如發送給後端服務器

      const data = {
        prime: prime,
        order: {
          shipping: "delivery",
          payment: "credit_card",
          subtotal: total,
          freight: 30,
          total: total + 30,
          recipient: {
            name: userFormData.name,
            phone: userFormData.phone,
            email: userFormData.email,
            address: userFormData.address,
            time: userFormData.send_time,
          },
          list: cartProducts.map((product) => ({
            id: product.product_id,
            name: product.title,
            price: product.price,
            color: {
              name: product.color_name,
              code: product.color_code,
            },
            size: product.size,
            qty: product.qty,
          })),
        },
      };

      console.log("data", data);

      fetch(`${backendurl}/api/1.0/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("result", result);
          if (result.error) {
            alert(result.message);
            return;
          }
          alert("訂單建立成功");
          storage.removeItem("cart");
          const event = new Event("customStorageChange");

          console.log(total, payTime);

          window.dispatchEvent(event);
          window.location.href =
            "/thankyou/?number=" +
            result.data.number +
            "&total=" +
            total +
            "&time=" +
            new Date().toLocaleString();
        });
    });
  }

  return (
    <>
      <Header />
      {windowWidth > 1280 ? (
        <div
          onClick={(e) => {
            setOpenCouponSelect(false);
          }}
        >
          <div className="mt-36"></div>
          <div className="flex justify-center">
            <div className="flex w-4/5">
              <div className="w-2/5 font-bold">購物車</div>
              <div className="flex w-3/5">
                <div className="w-1/4 font-bold text-center">數量</div>
                <div className="w-1/4 font-bold text-center">單價</div>
                <div className="w-1/4 font-bold text-center">小計</div>
                <div className="w-1/4 font-bold text-center"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex-col w-4/5 border border-gray-400 border-solid border-1">
              {cartProducts.length > 0
                ? cartProducts.map((product) => (
                    <div className="flex">
                      <div className="w-2/5 p-5 font-bold">
                        <div className="flex">
                          <div className="w-1/3">
                            <img
                              src={product.main_image}
                              className="w-full"
                              alt=""
                            />
                          </div>
                          <div className="w-2/3 ml-2">
                            <div className="mb-2 font-bold">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.product_id}
                            </div>
                            <div className="">
                              <div className="my-3 text-xs">
                                顏色 | {product.color_name}
                              </div>
                              <div className="my-3 text-xs">
                                尺寸 | {product.size}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-3/5">
                        <div className="flex items-center justify-center w-1/4 font-bold">
                          <select
                            name=""
                            id=""
                            className="border border-black"
                            onChange={(e) => {
                              setAmount(e.target.value, product.product_id);
                            }}
                            value={product.qty}
                          >
                            {Array.from(
                              { length: product.stock },
                              (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="flex items-center justify-center w-1/4 font-bold">
                          TWD.{product.price}
                        </div>
                        <div className="flex items-center justify-center w-1/4 font-bold">
                          TWD.{product.price * product.qty}
                        </div>
                        <div className="flex items-center justify-center w-1/4 font-bold cursor-pointer">
                          <div
                            onClick={() => {
                              deleteProduct(
                                product.product_id,
                                product.color_name,
                                product.size
                              );
                            }}
                          >
                            <img
                              src="/assets/images/icon-images/cart-remove.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : "*購物車是空的"}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div className="w-4/5">
              <div className="mb-2 font-bold">訂購資料</div>
              <div className="h-0.5 bg-gray-500"></div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>收件人姓名</div>
                  <input
                    type="text"
                    value={userFormData.name}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, name: e.target.value })
                    }
                  ></input>
                </div>
                <div className="font-bold text-red-500 text-end">
                  務必填寫完整收件人姓名，避免包裹無法順利簽收
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>手機</div>
                  <input
                    type="text"
                    value={userFormData.phone}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        phone: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>地址</div>
                  <input
                    type="text"
                    value={userFormData.address}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        address: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>Email</div>
                  <input
                    type="text"
                    value={userFormData.email}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        email: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>配送時間</div>
                  <div className="w-3/4">
                    <label>
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "morning"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "morning",
                          })
                        }
                        className="mr-2"
                      ></input>
                      08:00-12:00
                    </label>
                    <label className="ml-10">
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "afternoon"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "afternoon",
                          })
                        }
                        className="mr-2"
                      ></input>
                      14:00-18:00
                    </label>
                    <label className="ml-10">
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "不指定"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "不指定",
                          })
                        }
                        className="mr-2"
                      ></input>
                      不指定
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-10 font-bold">訂購資料</div>
              <div className="h-0.5 bg-gray-500"></div>

              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>信用卡號碼</div>
                  <div className="tpfield" id="card-number"></div>
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>有效期限</div>
                  <div className="tpfield" id="card-expiration-date"></div>
                </div>
              </div>
              <div className="flex-col w-3/5">
                <div className="flex justify-between w-full mt-5">
                  <div>安全碼</div>
                  <div className="tpfield" id="card-ccv"></div>
                </div>
              </div>

              <div className="flex justify-end my-10">
                <div className="w-72">
                  <div className="flex-col font-bold">
                    <div className="relative flex justify-between my-3">
                      <div>
                        優惠券{" "}
                        <span
                          className="ml-3 text-blue-700 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenCouponSelect(!openCouponSelect);
                          }}
                        >
                          選擇
                        </span>
                      </div>
                      {openCouponSelect && (
                        <div className="absolute flex top-[-180px] right-[-100px] h-44  bg-gray-500 bg-opacity-20 rounded-xl backdrop-filter backdrop-blur flex overflow-scroll w-[600px]">
                          {userCoupon.length > 0 ? (
                            <div
                              className="inline-flex items-center gap-3 px-2 mx-3"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              {userCoupon.map((coupon, index) => (
                                <div
                                  key={index}
                                  className={
                                    "flex-col flex items-center justify-center bg-gray-100 h-36 w-[200px] flex-shrink-0 shadow-md rounded-xl hover:shadow-xl cursor-pointer hover:bg-white transition duration-300 ease-in-out" +
                                    (selectedCoupon === index
                                      ? " border-2 border-gray-700"
                                      : "")
                                  }
                                  onClick={() => {
                                    selectedCoupon === index
                                      ? setSelectedCoupon(-1)
                                      : setSelectedCoupon(index);
                                  }}
                                >
                                  <div className="justify-center">
                                    <div className="mb-2 text-sm">
                                      登入優惠券
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center justify-center w-4/5">
                                    <img
                                      src={`/assets/images/coupons/${coupon.value}.png`}
                                      alt=""
                                    />
                                    <div className="justify-center mt-3">
                                      <div className="text-2xl">
                                        ${coupon?.value}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mx-auto">*沒有優惠券</div>
                          )}
                        </div>
                      )}
                      {selectedCoupon !== -1 && (
                        <div className="text-xl">
                          -NT. {userCoupon[selectedCoupon].value}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between my-3">
                      <div>總金額</div>
                      <div>
                        NT.
                        <span className="text-xl"> {total}</span>
                      </div>
                    </div>
                    <div className="flex justify-between my-3">
                      <div>運費</div>
                      <div>
                        NT.
                        <span className="text-xl"> 30</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full h-0.5 bg-black"></div>
                    </div>
                    <div className="flex justify-between my-3">
                      <div>應付金額</div>
                      <div>
                        NT.
                        <span className="text-xl">
                          {" "}
                          {total +
                            30 -
                            (selectedCoupon !== -1
                              ? userCoupon[selectedCoupon].value
                              : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-center h-16 text-white bg-black cursor-pointer mt-14"
                    onClick={() => {
                      createPayment();
                    }}
                  >
                    <div>確 認 付 款</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-32"></div>
          <div className="flex justify-center">
            <div className="flex-col w-4/5 mb-2 font-bold">
              <div className="flex font-bold">購物車</div>
              <div className="flex-col ">
                {cartProducts.length > 0
                  ? cartProducts.map((product) => (
                      <div className="flex-col mb-5">
                        <div className="h-0.5 w-full bg-black "> </div>
                        <div className="w-full py-5 font-bold">
                          <div className="flex">
                            <div className="w-1/3">
                              <img
                                src={product.main_image}
                                className="w-full"
                                alt=""
                              />
                            </div>
                            <div className="w-1/3 ml-2">
                              <div className="mb-2 font-bold">
                                {product.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.product_id}
                              </div>
                              <div className="">
                                <div className="my-3 text-xs">
                                  顏色 | {product.color_name}
                                </div>
                                <div className="my-3 text-xs">
                                  尺寸 | {product.size}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-end w-1/3">
                              <div
                                onClick={() => {
                                  deleteProduct(product.product_id);
                                }}
                              >
                                <img
                                  src="/assets/images/icon-images/cart-remove.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col">
                          <div className="flex">
                            <div className="flex justify-center w-1/3">
                              數量
                            </div>
                            <div className="flex justify-center w-1/3">
                              單價
                            </div>
                            <div className="flex justify-center w-1/3">
                              小計
                            </div>
                          </div>
                          <div className="flex my-3">
                            <div className="flex items-center justify-center w-1/3 font-bold">
                              <select
                                name=""
                                id=""
                                className="border border-black"
                                onChange={(e) => {
                                  setAmount(e.target.value, product.product_id);
                                }}
                                value={product.qty}
                              >
                                {Array.from(
                                  { length: product.stock },
                                  (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="flex items-center justify-center w-1/3 font-bold">
                              TWD.{product.price}
                            </div>
                            <div className="flex items-center justify-center w-1/3 font-bold">
                              TWD.{product.price * product.qty}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "*購物車是空的"}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div className="w-4/5">
              <div className="mb-2 font-bold">訂購資料</div>
              <div className="h-0.5 bg-gray-500"></div>
              <div className="flex-col ">
                <div className="flex justify-between w-full mt-5">
                  <div>收件人姓名</div>
                  <input
                    type="text"
                    value={userFormData.name}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        name: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="font-bold text-red-500 text-end">
                  務必填寫完整收件人姓名，避免包裹無法順利簽收
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>手機</div>
                  <input
                    type="text"
                    value={userFormData.phone}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        phone: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>地址</div>
                  <input
                    type="text"
                    value={userFormData.address}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        address: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>Email</div>
                  <input
                    type="text"
                    value={userFormData.email}
                    className="w-3/4 border border-2 border-gray-300 rounded-md focus:outline-none"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        email: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>配送時間</div>
                  <div className="w-3/4">
                    <label>
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "morning"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "morning",
                          })
                        }
                        className="mr-2"
                      ></input>
                      08:00-12:00
                    </label>
                    <label className="ml-10">
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "afternoon"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "afternoon",
                          })
                        }
                        className="mr-2"
                      ></input>
                      14:00-18:00
                    </label>
                    <label className="ml-10">
                      <input
                        type="radio"
                        id="option1"
                        checked={userFormData.send_time === "不指定"}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            send_time: "不指定",
                          })
                        }
                        className="mr-2"
                      ></input>
                      不指定
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-10 font-bold">訂購資料</div>
              <div className="h-0.5 bg-gray-500"></div>

              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>信用卡號碼</div>
                  <div className="tpfield" id="card-number"></div>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>有效期限</div>
                  <div className="tpfield" id="card-expiration-date"></div>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex justify-between w-full mt-5">
                  <div>安全碼</div>
                  <div className="tpfield" id="card-ccv"></div>
                </div>
              </div>

              <div className="flex justify-end my-10">
                <div className="w-72">
                  <div className="flex-col font-bold">
                    <div className="flex justify-between my-3">
                      <div>總金額</div>
                      <div>
                        NT.
                        <span className="text-xl"> {total}</span>
                      </div>
                    </div>
                    <div className="flex justify-between my-3">
                      <div>運費</div>
                      <div>
                        NT.
                        <span className="text-xl"> 30</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full h-0.5 bg-black"></div>
                    </div>
                    <div className="flex justify-between my-3">
                      <div>應付金額</div>
                      <div>
                        NT.
                        <span className="text-xl"> {total + 30}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-center h-16 my-5 text-white bg-black cursor-pointer mt-14"
                onClick={() => {
                  createPayment();
                }}
              >
                <div>確 認 付 款</div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
