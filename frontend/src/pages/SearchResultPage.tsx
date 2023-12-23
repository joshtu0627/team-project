import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/common/Header";
import Banner from "../components/homepage/Banner";
import ProductGrid from "../components/homepage/ProductGrid";
import Footer from "../components/common/Footer";

type SelectInfo = [number, string];

export default function SearchResultPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");

  const [selectInfo, setSelectInfo] = useState<SelectInfo>([0, ""]);

  useEffect(() => {
    setSelectInfo([2, keyword]);
  }, [keyword]);

  return (
    <>
      <Header />
      <Banner />
      <ProductGrid selectInfo={selectInfo} />
      <Footer />
    </>
  );
}
