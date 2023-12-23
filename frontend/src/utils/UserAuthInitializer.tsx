import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { backendurl } from "../constants/urls";

export default function UserAuthInitializer() {
  const { user, login, logout } = useUser();
  useEffect(() => {
    const storage = window.localStorage;
    const token = storage.getItem("token");
    console.log(token);
    fetch(`${backendurl}/api/1.0/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((userData) => {
        console.log(userData);
        login(userData.data);
        console.log("logged in");
      });
  }, []);
  return null; // 不渲染任何 UI 元素
}
