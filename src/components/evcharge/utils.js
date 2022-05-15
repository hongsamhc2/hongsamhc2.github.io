import axios from "axios"
export const getCurrentPos = ({
  lat = 33.450701,
  lng = 126.570667,
  callback = () => {},
}) => {
  let coord = new kakao.maps.LatLng(lat, lng);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        (lat = position.coords.latitude), (lng = position.coords.longitude);
        coord = new kakao.maps.LatLng(lat, lng);
        callback({ lat: lat, lng: lng });
      },
      function (err) {
        callback({ lat: lat, lng: lng });
      }
    );
  } else {
    callback({ lat: lat, lng: lng });
  }
};

export const requestInfoData = (data={},callback=()=>{}) => {
  let url = "";
  let headers = {
    'Content-Type': 'application/json'
}
  if (process.env.NODE_ENV === "development") {
      url ="http://127.0.0.1:48952/ev/info"
    } else if (process.env.NODE_ENV === "production") {
      url ="https://api.hiio420.com:48571/api/evcharge/info"
      headers={...headers,'Authorization':'alkcn122123qalkn3jnvjel34tj79g3sajsnck678'}
  }
  axios.post(url,data,{headers:headers}).then(d=>callback(d.data.data))
};


export const getCoordToAddr=(coord,callback=()=>{})=> {
    const {kakao} = window
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(coord.lng, coord.lat, (resp) => {

        const addr = resp[0].address.address_name
        callback(addr)

    })
}

export const calcDistance=(d)=>{
    if(d<1){
        return `${d.toFixed(3)}m`
    }else{
        return `${d.toFixed(3)}km`
    }
}