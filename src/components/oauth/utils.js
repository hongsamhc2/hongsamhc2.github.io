import { requestApi } from '../common/api';
export const success = (obj,cat)=>{
    requestApi.post('/jwt/encode',{data:obj}).then(r=>{
    localStorage.setItem('loginCat',cat)    
    localStorage.setItem('loginToken',r.data.token)
    window.location.pathname = '/oauth'
    })
}