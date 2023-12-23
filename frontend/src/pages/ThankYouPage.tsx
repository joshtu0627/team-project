import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import useWindowWidth from "../hooks/useWindowWidth";

import CartProduct from "../types/CartProduct";

export default function ThankYouPage() {
  const windowWidth = useWindowWidth();

  const [number, setNumber] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const number = urlParams.get("number");
    const total = urlParams.get("total");
    const time = urlParams.get("time");

    setNumber(number ? parseInt(number) : 0);
    setTotal(total ? parseInt(total) : 0);
    setTime(time ? time : "");
  }, []);

  return (
    <>
      <Header />
      <div className="mt-32"></div>
      <div className="flex justify-center font-bold h-72">
        謝謝您的購買，您的訂單編號為：{number}，總金額為：{total}
        ，下單時間為：{time}
      </div>

      <div className="flex items-"></div>
      <Footer />
    </>
  );
}
