import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import LoginPanel from "../components/loginpage/LoginPanel";

export default function Loginpage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex items-center justify-center h-full">
        <LoginPanel />
      </div>
      <Footer />
    </div>
  );
}
