import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import { useUser } from "../contexts/UserContext";

import Button from "@mui/material/Button";
import PaidOrders from "../components/profilepage/PaidOrders";

export default function ProfilePage() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center w-4/5 h-full">
        <div>名字: {user?.name}</div>
        <div className="mb-5">email: {user?.email}</div>
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
        <PaidOrders />
      </div>
      
      
      <Footer />
    </div>
  );
}
