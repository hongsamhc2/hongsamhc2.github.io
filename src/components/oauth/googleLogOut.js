import React from 'react'

const GoogleLogOut=({google})=>{

    const onClick = ()=>{

        localStorage.removeItem('loginToken')
        localStorage.removeItem('loginCat')
        google.accounts.id.disableAutoSelect();
        window.location.pathname="/oauth"

    }
    return(
        <div onClick={onClick}>로그아웃</div>
    )

}

export default GoogleLogOut