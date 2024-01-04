import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import { useUser } from "../contexts/UserContext";
import { backendurl } from "../constants/urls";

import Button from "@mui/material/Button";
import PaidOrders from "../components/profilepage/PaidOrders";

export default function ProfilePage() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();

  const [userCoupon, setUserCoupon] = useState([]);
  const [userfavorite, setUserfavorite] = useState([]);
  const [userfavoriteDetail, setUserfavoriteDetail] = useState([]);

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

  useEffect(() => {
    if (!user) return;
    fetch(`${backendurl}/api/1.0/user/getFavoriteList?user_id=${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data", data);
        setUserfavorite(data.favoriteList);
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchProductDetail = async () => {
      let result = [];
      for (let i = 0; i < userfavorite.length; i++) {
        let detail = await fetch(
          `${backendurl}/api/1.0/products/details?id=${userfavorite[i].product_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let detailData = await detail.json();

        result.push(detailData.data);
      }
      console.log("result", result);

      setUserfavoriteDetail(result);
    };
    fetchProductDetail();
  }, [userfavorite]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center w-4/5 h-full mt-36">
        <div className="w-3/5">
          <div className="mb-2 text-2xl font-bold text-center">個人資料</div>
          <div className="h-0.5 bg-gray-500"></div>
          <div className="flex items-center justify-between w-full p-5">
            <div className="text-xl font-bold">大頭貼:</div>
            <div className="w-24 h-24">
              <img
                className="w-full h-full rounded-full"
                src={user?.picture}
                alt=""
              />
            </div>
          </div>
          <div className="h-0.5 bg-gray-300"></div>
          <div className="flex items-center justify-between w-full p-5 my-3">
            <div className="text-xl font-bold">名字:</div>
            <div className="text-xl">{user?.name}</div>
          </div>
          <div className="h-0.5 bg-gray-300"></div>
          <div className="flex items-center justify-between w-full p-5 my-3">
            <div className="text-xl font-bold">email:</div>
            <div className="text-xl">{user?.email}</div>
          </div>
          <div className="mt-12 mb-2 text-2xl font-bold text-center">
            擁有的優惠券
          </div>
          <div className="h-0.5 bg-gray-500"></div>

          <div className="flex my-3 overflow-scroll h-44 rounded-xl backdrop-filter backdrop-blur ">
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
                      "flex-col border-2 border-gray-500 flex items-center justify-center bg-gray-100 h-36 w-[200px] flex-shrink-0 shadow-md rounded-xl hover:shadow-xl cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out"
                    }
                  >
                    <div className="justify-center">
                      <div className="mb-2 text-sm">
                        {coupon.description === "Unexpected Windfall"
                          ? "直播獎勵"
                          : "登入優惠券"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-4/5">
                      <img
                        src={`/assets/images/coupons/${coupon.value}.png`}
                        alt=""
                      />
                      <div className="justify-center mt-3">
                        <div className="text-2xl">${coupon?.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto">*沒有優惠券</div>
            )}
          </div>
          <div className="mt-12 mb-2 text-2xl font-bold text-center">
            喜歡列表
          </div>
          <div className="h-0.5 bg-gray-500"></div>
          <div className="grid grid-cols-2 gap-4">
            {userfavoriteDetail &&
              userfavoriteDetail.length > 0 &&
              userfavoriteDetail.map((product, index) => (
                <Link
                  className="flex items-center p-2 mt-2 mb-8 transition duration-300 hover:opacity-50"
                  key={product.id}
                  to={`/products/${product.id}`}
                  target="_blank"
                >
                  <div className="flex-col items-center w-20 overflow-hidden rounded-xl">
                    <img src={product.main_image} className="w-20" alt="" />
                  </div>
                  <div className="flex-col justify-center ml-5">
                    <div className="">{product.title}</div>
                    <div className="text-lg font-bold">
                      <div>TWD.{product.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="mt-12 mb-2 text-2xl font-bold text-center">
            歷史訂單
          </div>
          <div className="h-0.5 bg-gray-500"></div>
          <PaidOrders />
        </div>

        <div className="my-5">
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            logout
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
