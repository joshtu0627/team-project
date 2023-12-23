import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import RegisterPanel from "../components/registerpage/RegisterPanel";

export default function Registerpage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex items-center justify-center h-full">
        <RegisterPanel />
      </div>
      <Footer />
    </div>
  );
}
