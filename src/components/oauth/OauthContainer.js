import React, { useEffect } from "react";
import GoogleLogIn from "./googleLogin";
import GoogleLogOut from "./googleLogOut";
import KakaoLogIn from "./kakaoLogIn";
import KakaoLogOut from "./kakaoLogOut";

const OauthContainer = ({ isLogged,oauthCategory }) => {
  const { Kakao, google } = window;




  const logoutContainer={
      'google':<GoogleLogOut google={google}/>,
      'kakao':<KakaoLogOut />

  }

  return (
    <>
      {!isLogged ? (
        <>
          <KakaoLogIn />
          <GoogleLogIn google={google} isLogged={isLogged}/>
        </>
      ) : (
        <>
          {logoutContainer[oauthCategory]}
        </>
      )}
    </>
  );
};


export default OauthContainer;
