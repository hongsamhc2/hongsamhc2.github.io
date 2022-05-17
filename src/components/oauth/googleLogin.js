import React, { useEffect,useRef } from "react";
import { success } from "./utils";
import kakaoLogInImg from "../../resources/png/kakao_login_medium_narrow.png";
import $ from 'jquery'
const GoogleLogIn = ({ isLogged, google }) => {
    const {gapi} = window
    const lbtn = useRef()
  const CLIENT_ID =
    "329448997792-gvadpfn3a614os4f4lb1107gu1a1omr6.apps.googleusercontent.com";
  useEffect(() => {
    if (!isLogged) {

    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            clientId: CLIENT_ID,
            plugin_name: "chat"
        }).then(e=>console.log(e)).catch(err=>console.log(err))
        const GoogleAuth = gapi.auth2.getAuthInstance()
        console.log(GoogleAuth)
        let options = new gapi.auth2.SigninOptionsBuilder();
		options.setPrompt('select_account');
        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
		options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
		gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
        gapi.signin2.render('GgCustomLogin', {
            'scope': 'profile email',
            'width': 850,
            'height': 50,
            'longtitle': true,
            'theme': 'standard',
            'onsuccess': onSignIn,
            'onfailure': onSignInFailure
          });
    })
    
    }
  }, []);
  const style={
      background:`url(${kakaoLogInImg}) no-repeat`,
      width:'320px',
      height:'40px'

  }

  return <>
  <div id="buttonDiv2" style={style} onClick={()=>{
      console.log(document.querySelector('.nsm7Bb-HzV7m-LgbsSe'))
document.querySelector('.nsm7Bb-HzV7m-LgbsSe').click()
  }}></div>
  <div id="buttonDiv" ref={lbtn}></div>
  <div id="GgCustomLogin">asdasds</div>
  {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
  </>;
};

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);
  const obj = {
    id: responsePayload.sub,
    name: responsePayload.name,
    email: responsePayload.email,
    profil_img: responsePayload.picture,
  };
  success(obj, "google");
}

function decodeJwtResponse(s) {
  let b64DecodeUnicode = (str) =>
    decodeURIComponent(
      Array.prototype.map
        .call(
          atob(str),
          (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

  let parseJwt = (token) =>
    JSON.parse(
      b64DecodeUnicode(token.split(".")[1].replace("-", "+").replace("_", "/"))
    );
  return parseJwt(s);
}

function onSignIn(googleUser) {
    console.log(googleUser)
    console.log(googleUser.getAuthResponse())
	var access_token = googleUser.getAuthResponse().access_token
    console.log(googleUser.getBasicProfile())
    const c = googleUser.getBasicProfile()
    console.log(c.getEmail())
    console.log(c.getName())
    console.log(c.getImageUrl())
    console.log(c.getId())
	// $.ajax({
    // 	// people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
	// 	url: 'https://people.googleapis.com/v1/people/me'
    //     // key에 자신의 API 키를 넣습니다.
	// 	, data: {personFields:'birthdays', key:'AIzaSyBOdmeC4SOSzXmPGLEM2vZueqiBSWKg3wk', 'access_token': access_token}
	// 	, method:'GET'
	// })
	// .done(function(e){
    //     //프로필을 가져온다.
	// 	var profile = googleUser.getBasicProfile();
	// 	console.log(profile)
	// })
	// .fail(function(e){
	// 	console.log(e);
	// })
}
function onSignInFailure(t){		
	console.log(t);
}
export default GoogleLogIn;
