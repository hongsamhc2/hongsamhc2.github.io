import axios from 'axios'
const url = (process.env.NODE_ENV ==="development")?process.env.DEV_URL:process.env.PROD_URL

export const requestApi = axios.create({
    baseURL:url
})

requestApi.defaults.headers.common['Authrization'] = 'alkcn122123qalkn3jnvjel34tj79g3sajsnck678';
requestApi.defaults.headers.post['Content-Type'] = 'application/json';