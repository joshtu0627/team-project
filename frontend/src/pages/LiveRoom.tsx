import React, { useState, useEffect } from 'react';
import "@livekit/components-styles";
import { Chat } from "@livekit/components-react";
import { useUser } from "../contexts/UserContext";
import { backendurl } from "../constants/urls";
import { Room, Participant, TrackPublication, RoomEvent } from "livekit-client";
import styled from 'styled-components';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import jwt from 'jsonwebtoken';



import { FaExternalLinkAlt } from 'react-icons/fa';
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  VideoConference,
  useLiveKitRoom,
  useTracks,
  FocusLayout,
  FocusLayoutContainer,
} from '@livekit/components-react';

import { Track } from "livekit-client";

const serverUrl = 'wss://stylish-ij2vs7me.livekit.cloud';
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDM3MDM1OTgsImlzcyI6IkFQSTIySGpHVVBiSktacSIsIm5iZiI6MTcwMzY5NDU5OCwic3ViIjoicGluZSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJwaW5lX3Rlc3QiLCJyb29tSm9pbiI6dHJ1ZX19.HXxfiSmwHgyD3Vg0ego_5ZT-On9Qx-ytChNVA6M0CwA';


const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  height: 100%;
  z-index: 2000; 
`;


const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const StyledControlBar = styled(ControlBar)`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left:-230px;
`;

const StyledJoinMessages = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100; 
  color: white;
  background-color: rgba(0, 0, 0, 0.5); // 半透明背景
  padding-left: 5px;
`;

const VideoContainerWithMargin = styled(VideoContainer)`
  margin-top: 111px; 
  height: 85vh; 
  overflow: hidden;
`;


function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.

  const [productID, setProductID] = useState(""); // 用于存储商品ID
  const [showCartButton, setShowCartButton] = useState(false);
  const [showInput, setShowInput] = useState(false);


  const tracks = useTracks(
    [

      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  const initiatorIdentity = 'user-yh';

  //處理商品id的邏輯
  const handleSubmit = () => {
    // 輸入的id存在productId
    if (productID) {
      setShowCartButton(true);
    }
  };

  // const focusTrack = tracks.find(track => track.participant.identity === initiatorIdentity);
  // const otherTracks = tracks.filter(track => track.participant.identity !== initiatorIdentity);
  const initiatorTrack = tracks.find(track => track.participant.identity === initiatorIdentity);
  const otherTracks = tracks.filter(track => track.participant.identity !== initiatorIdentity);

  // useEffect(() => {
  //   const storage = window.localStorage;
  //   const token = storage.getItem("token");

  //   const decodeToken = (token) => {
  //     try {
  //       const decoded = jwt.decode(token);
  //       return decoded;
  //     } catch (error) {
  //       console.error('解析error:', error);
  //       return null;
  //     }
  //   };

  //   if (token) {
  //     const decodedToken = decodeToken(token);
  //     if (decodedToken && decodedToken.id === 10243) {
  //       setShowInput(true);
  //     }
  //   }
  // }, []);




  return (

    <div style={{ position: 'relative', height: '100%' }}>


      <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height) ) ' }}>
        <div>
          {tracks.map(track => {
            // 只為發起者渲染頭像
            if (track.participant.identity === initiatorIdentity) {
              return <ParticipantTile key={track.sid} track={track} />;
            }
            return null;  // 不渲染其他參與者的頭像
          })}
        </div>
      </GridLayout>



      <a href="https://example.com" target="_blank" rel="noopener noreferrer"
        style={{ position: 'absolute', top: 400, right: 100, zIndex: 1000 }}>
        <img src="coupon.png" alt="優惠卷" style={{ width: '100px', height: '100px' }} />
      </a>

      <a href="https://example.com" target="_blank" rel="noopener noreferrer"
        style={{ position: 'absolute', top: 500, right: 100, zIndex: 1000 }}>
        <img src="cart.png" alt="購物連結" style={{ width: '80px', height: '80px' }} />
      </a>


    </div>




    // <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
    //   {/* The GridLayout accepts zero or one child. The child is used
    //   as a template to render all passed in tracks. */}
    //   {/* <ParticipantTile /> */}
    // </GridLayout>
  );
}









export default function LiveRoom() {

  const [token, setToken] = useState(null);
  const [joinMessages, setJoinMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState("");

  // useEffect(() => {
  //   const room = new Room();

  //   const handleParticipantConnected = participant => {
  //     const message = `${participant.identity} 加入了房間`;
  //     setDisplayMessage(message);
  //     setTimeout(() => setDisplayMessage(""), 2000); 
  //   };

  //   const handleParticipantDisconnected = participant => {
  //     const message = `${participant.identity} 離開了房間`;
  //     setDisplayMessage(message);
  //     setTimeout(() => setDisplayMessage(""), 2000); 
  //   };



  //   room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);
  //   room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

  //   if (token) {
  //     room.connect(serverUrl, token).catch(console.error);
  //   }

  //   return () => {
  //     room.disconnect();
  //   };
  // }, [serverUrl, token]);




  // 前端使用 fetch 請求 token
  useEffect(() => {
    const storage = window.localStorage;
    const token = storage.getItem("token"); // 這是用戶的登入 token，不是 livekit 的 token

    fetch(`${backendurl}/getToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // 使用 Bearer token 進行驗證
      },
    })
      .then(response => response.json())
      .then(data => {
        setToken(data.token); // 假設後端響應中包含了生成的 livekit token
      })
      .catch(error => {
        console.error('獲取令牌時出錯:', error);
      });
  }, []);



  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <VideoContainerWithMargin>
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          data-lk-theme="default"
        >

          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 3 }}>
              <MyVideoConference />
              <RoomAudioRenderer />
              <StyledControlBar />
            </div>
            <StyledChatContainer>
              <Chat />
            </StyledChatContainer>
          </div>
        </LiveKitRoom>
        {/* <StyledJoinMessages>
        {displayMessage && <div>{displayMessage}</div>}
      </StyledJoinMessages> */}
      </VideoContainerWithMargin>
      <Footer />
    </div>
  );
}