import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import Header from "../components/common/Header";
import Banner from "../components/homepage/Banner";
import ProductGrid from "../components/homepage/ProductGrid";
import Footer from "../components/common/Footer";
import MessageBox from "../components/common/MessageBox";
import { frontendurl } from "../constants/urls";
import Calendar from "../components/common/Calendar";

import { useUser } from "../contexts/UserContext";

type SelectInfo = [number, string];

export default function HomePage() {
  const { user, login, logout } = useUser();

  const [selectInfo, setSelectInfo] = useState<SelectInfo>([0, ""]);
  const [hasLoggedIn, setHasLoggedIn] = useState(true);
  const [dates, setDates] = useState([]);
  const [todayReward, setTodayReward] = useState(null);
  const [continueDay, setContinueDay] = useState(null);

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/all");
      console.log("redirect");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    // 取得年月日
    const now = dayjs();
    const year = now.year();
    const month = now.month() + 1;
    const day = now.date();

    console.log(year, month, day);

    fetch(
      `http://localhost:3000/api/1.0/user/checkIn?user_id=${user.id}&year=${year}&month=${month}&day=${day}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        // if (res.ok) {
        //   setHasLoggedIn(true);
        // }

        return res.json();
      })
      .then((data) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data);
        if (!data.hasCheckedIn) {
          setHasLoggedIn(false);
          console.log(data.dates);

          setDates(data.dates);
          setContinueDay(data.continueDay);
          setTodayReward(data.reward);
        }
      });
  }, [user]);

  useEffect(() => {
    if (category) {
      setSelectInfo([1, category]);
    }
  }, [category]);

  const navigateToLiveRoom = () => {
    navigate("/live");
    //window.location.href = `${frontendurl}/live`;
  };

  const navigateToStory = () => {
    navigate("/story/show");
  };

  return (
    <div>
      <Header /> <Banner />
      <ProductGrid selectInfo={selectInfo} />
      <MessageBox />
      <Footer />
      {!hasLoggedIn && (
        <>
          <Calendar
            dates={dates}
            setHasLoggedIn={setHasLoggedIn}
            todayReward={todayReward}
            continueDay={continueDay}
          />
          <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur"></div>
        </>
      )}
      <div
        style={{
          position: "fixed",
          left: "1%",
          top: "75%",
          transform: "translateY(-50%)",
          zIndex: 40,
          cursor: "pointer",
        }}
        onClick={navigateToLiveRoom}
      >
        <img
          src="live3.png"
          alt="進入直播間"
          style={{ width: "100px", height: "100px" }}
        />
        <p
          style={{
            margin: "-18% 0 0 15%",
            fontSize: "14px",
            color: "#333",
            fontFamily: "Microsoft YaHei, Arial, sans-serif",
          }}
        >
          進入直播間
        </p>
      </div>
      <div
        style={{
          position: "fixed",
          left: "1%",
          top: "85%",
          transform: "translateY(-50%)",
          zIndex: 40,
          cursor: "pointer",
        }}
        onClick={navigateToStory}
      >
        <img
          src="camera.png"
          alt="限時動態"
          style={{ width: "100px", height: "100px" }}
        />
        <p
          style={{
            margin: "-18% 0 0 15%",
            fontSize: "14px",
            color: "#333",
            fontFamily: "Microsoft YaHei, Arial, sans-serif",
          }}
        >
          限時動態
        </p>
      </div>
    </div>
  );
}
