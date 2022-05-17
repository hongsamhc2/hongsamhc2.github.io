import React, { useEffect,useState } from "react";
import { useLocation } from "react-router";
const Tistory = () => {
  const CLIENT_ID = "890c13ae5291fafab4fb62a71276d664";
  const REDIRECT_URI = "http://localhost:8080/callback/tistory";
  const url = `https://www.tistory.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const { state } = useLocation();
    console.log(state);
    window.onSuccess = (res)=>{
      console.log(res)
    }
  const onClick = () => {
    window.open(url,"width=400,height=200")

  };

  return (
    <>
      <button onClick={onClick}> 연결하기</button>
    </>
  );
};

export default Tistory;
