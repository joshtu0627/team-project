import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Banner from "../components/homepage/Banner";
import ProductGrid from "../components/homepage/ProductGrid";
import Footer from "../components/common/Footer";

type SelectInfo = [number, string];

export default function HomePage() {
  const [selectInfo, setSelectInfo] = useState<SelectInfo>([0, ""]);

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/all");
      console.log("redirect");
    }
  }, []);

  useEffect(() => {
    if (category) {
      setSelectInfo([1, category]);
    }
  }, [category]);

  return (
    <div>
      <Header />
      <Banner />
      <ProductGrid selectInfo={selectInfo} />
      <Footer />
    </div>
  );
}
