import React, { useState, useEffect, useRef } from "react";
import webSocket from "socket.io-client";

import { useUser } from "../../../contexts/UserContext";

import { socketurl, backendurl } from "../../../constants/urls";

import { IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { IoChatbox } from "react-icons/io5";

import Button from "@mui/material/Button";

import { generateTimestamp, getTimeDiff } from "../../../utils/tools";

export default function MessageBox({
  messageOpen,
  messageCurrentRoom,
}: {
  messageOpen: boolean;
  messageCurrentRoom: number;
}) {
  const scrollRef = useRef(null);
  const sendButtonRef = useRef(null);

  const { user } = useUser();

  const [ws, setWs] = useState(null);

  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState({});
  const [rooms, setRooms] = useState([]);

  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentRoomName, setCurrentRoomName] = useState(null);

  const [update, setUpdate] = useState(false);

  const [userMessage, setUserMessage] = useState("");

  const changeRoom = (id: number) => {
    const room = id;
    console.log("change room", room);
    ws.emit("joinRoom", room);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const sendMessage = (name: string, message: string) => {
    ws.emit(name, message);
  };

  const handleGetMessage = (message: string) => {
    message = JSON.parse(message);
    message.id = Math.floor(Math.random() * 100000);
    console.log("123123");

    console.log(messages);

    // const newMessages = {
    //   ...messages,
    //   [message.room_id]: [...messages[message.room_id], message],
    // };
    // setMessages(newMessages);
    // setUpdate(!update);
    setMessages((m) => ({
      ...m,
      [message.room_id]:
        m[message.room_id] === undefined
          ? [message]
          : [...m[message.room_id], message],
    }));
  };

  useEffect(() => {
    if (!messageCurrentRoom || messageCurrentRoom == -1) return;
    fetch(`${backendurl}/api/1.0/message/rooms/${user.id}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${storage.getItem("token")}`,
      // },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (!data) return;
        console.log("in");

        for (let i = 0; i < data.rooms.length; i++) {
          const maxLen = 5;
          if (data.rooms[i].room_name.length > maxLen) {
            data.rooms[i].sliced_room_name =
              data.rooms[i].room_name.slice(0, maxLen) + "...";
          }
        }
        setRooms(data.rooms);
        setUpdate(!update);
      });
    setCurrentRoom(messageCurrentRoom);
  }, [messageCurrentRoom]);

  useEffect(() => {
    if (!messageOpen) return;
    if (!active) setActive(true);
  }, [messageOpen]);

  useEffect(() => {
    if (!user) return;
    console.log(user);

    fetch(`${backendurl}/api/1.0/message/rooms/${user.id}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${storage.getItem("token")}`,
      // },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (!data) return;
        console.log("in");

        for (let i = 0; i < data.rooms.length; i++) {
          const maxLen = 5;
          if (data.rooms[i].room_name.length > maxLen) {
            data.rooms[i].sliced_room_name =
              data.rooms[i].room_name.slice(0, maxLen) + "...";
          }
        }
        setRooms(data.rooms);
        setUpdate(!update);
      });

    const connectWebSocket = () => {
      setWs(webSocket(socketurl));
    };

    connectWebSocket();
  }, [user]);

  useEffect(() => {
    if (!currentRoom) return;

    fetch(`${backendurl}/api/1.0/message/${currentRoom}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${storage.getItem("token")}`,
      // },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (!data) return;

        changeRoom(currentRoom);
        setMessages((m) => ({ ...m, [currentRoom]: data.messages }));
      });
  }, [currentRoom]);

  useEffect(() => {
    if (messageCurrentRoom > 0) return;
    if (!rooms || rooms.length === 0) return;
    setCurrentRoom(rooms[0].id);
    changeRoom(rooms[0].id);
  }, [rooms]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!ws) return;

    const initWebSocket = () => {
      ws.on("getMessage", (message) => {
        console.log(message);
      });
      ws.on("getMessageRoomReceive", (message) => {
        console.log("get message");
        console.log(message);
        handleGetMessage(message);
      });
    };
    initWebSocket();
    console.log("success connect!");

    return () => {
      ws.close();
    };
  }, [ws]);

  useEffect(() => {
    if (!ws) return;
    ws.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [ws]);

  return (
    <>
      {active ? (
        <div className="fixed flex flex-col w-1/3 bg-gray-200 rounded-lg bottom-6 right-3 shadow-3xl h-1/2">
          <div
            className="w-full  cursor-pointer h-1/6"
            onClick={() => {
              setActive(!active);
            }}
          >
            <div className=" p-5 flex justify-between">
              <div className="text-3xl">客服</div>
              <div className="flex items-end">
                <div className="text-m">{currentRoomName}</div>
              </div>
            </div>
          </div>
          <div className="flex w-full h-5/6 rounded-xl">
            <div className="flex-col w-1/3 overflow-y-scroll">
              {rooms &&
                rooms.map((room) => (
                  <div key={room.id}>
                    <div
                      className={
                        "flex items-center w-full h-20 p-3" +
                        (currentRoom === room.id ? " bg-white" : "")
                      }
                      onClick={() => {
                        setCurrentRoom(room.id);
                        setCurrentRoomName(room.room_name);
                      }}
                    >
                      <div className="w-12 h-12">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={room.image}
                        ></img>
                      </div>
                      <div className="flex flex-col ml-3">
                        <div className="text-l">{room.sliced_room_name}</div>
                        {/* <div></div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-2/3 h-full bg-white">
              <div className="overflow-y-scroll h-5/6" ref={scrollRef}>
                {currentRoom && messages[currentRoom] ? (
                  messages[currentRoom].map((message) => (
                    <div
                      className={`flex w-full p-3 ${
                        message.sender_id === user.id ? "justify-end" : ""
                      }`}
                      key={message.id}
                    >
                      {message.sender_id === user.id && (
                        <div className="flex flex-col justify-end">
                          <div>
                            <div className="flex items-center flex-1 px-5 mr-2 text-black bg-gray-200 text-l h-14 rounded-2xl">
                              {message.message_content}
                            </div>
                          </div>
                          <div className="flex w-full justify-begin">
                            <div className="mt-2 text-xs">
                              {getTimeDiff(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="w-12 h-12">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={message.image}
                        ></img>
                      </div>
                      {message.sender_id !== user.id && (
                        <div className="flex flex-col justify-begin">
                          <div>
                            <div className="flex items-center flex-1 px-5 mr-2 text-black bg-gray-200 text-l h-14 rounded-2xl">
                              {message.message_content}
                            </div>
                          </div>
                          <div className="flex w-full justify-begin">
                            <div className="mt-2 text-xs">
                              {getTimeDiff(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center w-full h-full p-3">
                    {/* <div className="text-2xl">No Message</div> */}
                  </div>
                )}
              </div>
              <div className="flex flex-col border-t-2 border-gray-400 h-1/6">
                <div className="flex items-center">
                  <CiImageOn className="w-8 h-8 ml-2" />
                  <BsEmojiSmile className="w-6 h-6 ml-2" />
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => {
                      setUserMessage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendButtonRef.current.click();
                      }
                    }}
                    className="w-full px-2 rounded-l outline-none"
                    placeholder="輸入訊息"
                  />
                  <button
                    ref={sendButtonRef}
                    onClick={() => {
                      console.log(user);

                      let payload = {
                        sender_id: user.id,
                        room_id: currentRoom,
                        message_content: userMessage,
                        image: user?.picture,
                        timestamp: generateTimestamp(),
                      };

                      sendMessage("getMessageRoom", JSON.stringify(payload));
                      setUserMessage("");
                    }}
                    className="w-12 h-12 px-2 rounded-r"
                  >
                    <IoMdSend className="w-6 h-6" />
                  </button>
                </div>
                {/* <div className="flex items-center h-1/3 ml-2">
                  <CiImageOn className="w-8 h-8" />
                  <BsEmojiSmile className="w-6 h-6 ml-2" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`fixed flex items-center justify-center p-4 m-4 rounded-lg shadow-md cursor-pointer ${
            active
              ? "bg-red-200 scale-125 top-0 left-0"
              : "bg-gray-200 w-36 text-2xl bottom-0 right-0"
          }`}
          onClick={() => {
            setActive(!active);
          }}
        >
          <div>
            <IoChatbox className="h-6 mr-2 w-6" />
          </div>
          <div>客服</div>
        </div>
      )}
    </>
  );
}
