import React, { useEffect,useState } from "react";
import axios from "axios";
const Tistory = () => {
    const [authCode,setAuthCode] = useState(null)
  const CLIENT_ID = "890c13ae5291fafab4fb62a71276d664";
  const REDIRECT_URI = "http://localhost:8080/tistory";
    const CLIENT_SECRET = "890c13ae5291fafab4fb62a71276d6643f461aaa52e6bb3ba9960e8bd636cbd3ff272674"
  const url = `https://www.tistory.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    axios.post('http://server.hiio420.com/jwt/encode',{data:{a:"c"}}).then(e=>console.log(e))
    if (code !== null) {
        const access_token_url = `GET https://www.tistory.com/oauth/access_token?
        client_id=${CLIENT_ID}
        &client_secret=${CLIENT_SECRET}
        &redirect_uri=${REDIRECT_URI}
        &code=${code}
        &grant_type=authorization_code`;
        setAuthCode(code)
        axios.get(access_token_url).then(e=>sessionStorage.setItem('acc',JSON.stringify(e)))
    }
  }, []);
  const onClick = () => {
    window.open(url, "네이버팝업", "width=700px,height=800px,scrollbars=yes");
    window.location.href = `http://localhost:8080/tistory/${authCode}`

  };

  return (
    <>
      <button onClick={onClick}> 연결하기</button>
    </>
  );
};

export default Tistory;
