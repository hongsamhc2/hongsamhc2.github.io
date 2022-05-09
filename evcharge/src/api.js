
export const apiInfoUrl = ()=>{
    const result = {}
    const pathname = window.location.origin
    if (pathname==="http://hiio420.com"){
        result.url = "http://3.37.160.231:48571/api/evcharge/info"
        result.headers = {
            'Authorization':'alkcn122123qalkn3jnvjel34tj79g3sajsnck678',
            'Content-Type': 'application/json'
        }
        return result
    }else{
        result.url = "http://127.0.0.1:48952/ev/info"
        result.headers = {
            'Content-Type': 'application/json'
        }
        return result
    }

}
