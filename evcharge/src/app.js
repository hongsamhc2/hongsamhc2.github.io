import './resources/css/reset.css'
import './resources/css/font.css'
import './resources/css/app.css'
import marker_cur from './resources/svg/marker_cur.svg'
import marker_ev from './resources/svg/marker_ev.svg'
// import EvCharge from './evcharge'

import {
    apiInfoUrl
} from "./api";

class EvCharge {
    constructor(sel = "#map") {
        this.sel = document.querySelector(sel);
        this.level = 6;
        this.data = [];
        this.apiInfoParams = apiInfoUrl();
        this.currentLat = 33.450701
        this.currentLng = 126.570667
        this.addr = ''
        this.radius = 3000
        this.map
        this.geocoder = new kakao.maps.services.Geocoder();
        this.evMarkerArray = []
        this.circle
        this.currentMarker
        
    }

    init() {
        this.map = this.drawMap();
        this.currentMarker=this.addMarker(new kakao.maps.LatLng(this.currentLat,this.currentLng),marker_cur)
        this.requestData(this.currentLat ,this.currentLng,this.addr,this.radius).then(d=>this.addEvMarkerArray(d.data));
        kakao.maps.event.addListener(this.map,'click',(e)=>{
            this.removeEvMarkerArray()
            this.currentMarker.setMap(null)
            this.currentMarker=this.addMarker(new kakao.maps.LatLng(e.latLng.getLat(),e.latLng.getLng()),marker_cur)
            this.moveMap(e.latLng)
            this.getCoordToAddr(e)
        })

        return this;
    }

    drawMap() {
        var options = {
            center: new kakao.maps.LatLng(this.currentLat , this.currentLng),
            level: this.level,
        };
        var map = new kakao.maps.Map(this.sel, options);
        return map;
    }

    requestData(lat=33.450701, lng=126.570667, addr='', radius=3000) {
        const options = {
            method: "POST",
            body: JSON.stringify({
                coord: {
                    'lat': lat,
                    'lng': lng,
                    'addr': addr,
                    radius: radius
                }
            }),
            headers:this.apiInfoParams.headers
        }
        return fetch(this.apiInfoParams.url,options).then(d=>d.json());
    }

    addMarker(coord,imgsrc=''){
        const imgsize = new kakao.maps.Size(64,69)
        const imgOption = {offset:new kakao.maps.Point(27,69)}
        const markerImg = new kakao.maps.MarkerImage(imgsrc, imgsize, imgOption)
        
        const marker = new kakao.maps.Marker({
            position:coord,
            image:markerImg
        })
        marker.setMap(this.map)
        return marker
    }
    addEvMarkerArray(data){
        const addrArray = []
        data.map(d=>{
            if(d===undefined || addrArray.includes(addr)){
                return false
            }
            const addr = d.addr
            const coord = new kakao.maps.LatLng(d.lat,d.lng)
            const marker = this.addMarker(coord,marker_ev)
            this.evMarkerArray.push(marker)
            addrArray.push(addr)


        })
    }
    removeEvMarkerArray(){
        this.evMarkerArray.map(m=>{
            if (m!==undefined){
                m.setMap(null)
            }
        })
        return false
    }


    getCoordToAddr(e){
        this.geocoder.coord2Address(e.latLng.getLng(), e.latLng.getLat(), (resp)=>{

            const addr = resp[0].address.address_name
            this.requestData(e.latLng.getLat(),e.latLng.getLng(),addr,this.radius).then(d=>this.addEvMarkerArray(d.data));
            
            })
    }

    moveMap(latLng){
        this.map.panTo(latLng)
    }

}



const evc =new EvCharge('#map')
evc.init()