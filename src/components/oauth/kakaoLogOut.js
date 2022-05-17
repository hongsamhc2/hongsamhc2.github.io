import React from 'react'
const KakaoLogOut = ({})=>{

const {Kakao} = window
const onClick=()=>{
    if (!Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
      }
      Kakao.API.request({
        url: '/v2/user/revoke/scopes',
        data: {
            scopes: ["profile_nickname","profile_image","account_email","gender"]
        },
        success: function(response) {
            console.log(response);
        },
        fail: function(error) {
            console.log(error);
        }
    });
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function(response) {
          console.log(response);
        },
        fail: function(error) {
          console.log(error);
        },
      });

      Kakao.Auth.logout(function() {
        localStorage.removeItem('loginToken')
        localStorage.removeItem('loginCat')


      window.location.pathname = '/oauth'

        
      });
}
    return <div onClick={onClick}>로그아웃</div>
}

export default KakaoLogOut