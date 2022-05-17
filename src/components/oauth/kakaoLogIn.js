import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../common/api";
import kakaoLogInImg from "../../resources/png/kakao_login_medium_narrow.png";
import { success } from "./utils";
import styled from 'styled-components'

const KakaoLogIn = () => {
  const LogInBtn = styled.div`
  width:320px;
height:40px;
`
const Img = styled.img`
max-width:100%;
max-height:100%;
`
  const { Kakao } = window;
  useEffect(() => {
    Kakao.init("91a232c815b985a3c03bf9bee3c993a7");
  }, []);

  const onClick = () => {
    Kakao.Auth.login({
      success: function (response) {
        console.log(response);
        // requestApi.post('/jwt/encode',{data:response}).then(r=>localStorage.setItem('loginToken',r.data.token))
        Kakao.Auth.setAccessToken(response.access_token);
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log(response);
            const obj = {
              id: response.id,
              name: response.kakao_account.profile.nickname,
              email: response.kakao_account.email,
              profile_img: response.kakao_account.profile.profile_image_url,
            };
            success(obj, "kakao");
          },
          fail: function (error) {
            console.log(error);
          },
        });
        // window.location.pathname = '/oauth'
      },
      fail: function (error) {
        console.log(error);
      },
      throughTalk: false,
      scope: "profile_nickname,profile_image,account_email,gender",
    });
  };

  return (
    <LogInBtn id="kakao-btn">
      <Img src={kakaoLogInImg} onClick={onClick} />
    </LogInBtn>
  );
};

export default KakaoLogIn;
