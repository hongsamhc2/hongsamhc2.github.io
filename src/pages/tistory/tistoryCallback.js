import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
const TistoryCallback = ()=>{
    const navigate  = useNavigate()
    const [ s,setS] = useState('')
    useEffect(()=>{
        const code = new URL(window.location.href).searchParams.get('code')
        if(code !== null){
            window.opener.onSuccess(code)
            window.close()
        }
    },[])

    const onChange=(e)=>{
        setS(e.target.value)
        
    }
    return(<>

<input type='text' value ={s} onChange={onChange}/>
    
    
    </>)
}

export default TistoryCallback