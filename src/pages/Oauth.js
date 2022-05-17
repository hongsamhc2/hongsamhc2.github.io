import React,{useEffect,useState} from "react"
import KakaoLogIn from "../components/oauth/kakaoLogIn"
import KakaoLogOut from "../components/oauth/kakaoLogOut"
import { requestApi } from "../components/common/api"
import OauthContainer from "../components/oauth/OauthContainer"
const Oauth = ()=>{

    const [isLogged,setIsLogged] = useState(false)
    const [tokenInfo,setTokenInfo] = useState({})
    const [oauthCategory,setOauthCategory] = useState('')
    useEffect(()=>{


        
        
    },[])
    useEffect(()=>{
        const loginToken = localStorage.getItem('loginToken')
        const loginCat = localStorage.getItem('loginCat')
        if (loginToken !== null){
            setIsLogged(true)
            // requestApi.post('/jwt/decode',{data:token}).then(r=>{
            //     const {access_token} = r.data
            //     setTokenInfo(r.data)
            //   

            // })
        }
        if(loginCat !== null){
            setOauthCategory(loginCat)
        }
    },[])
    return(<>
    <OauthContainer isLogged={isLogged} oauthCategory={oauthCategory} />
    
    </>)
}


export default Oauth