import marker_cur from './resources/svg/marker_cur.svg'
import marker_ev from './resources/svg/marker_ev.svg'
import {
    apiInfoUrl
} from "./api";

class EvCharge {
    constructor(sel = "#map") {
        this.sel = document.querySelector(sel);
        this.level = 6;
        this.evData = {};
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
        this.requestData(this.currentLat, this.currentLng, this.addr, this.radius).then(d => this.addEvMarkerArray(d.data));
        this.currentMarker = this.addMarker(new kakao.maps.LatLng(this.currentLat, this.currentLng), marker_cur)
        this.circle = this.drawCircle(this.currentLat,this.currentLng)


        return this;
    }

    drawMap() {
        var options = {
            center: new kakao.maps.LatLng(this.currentLat, this.currentLng),
            level: this.level,
        };
        var map = new kakao.maps.Map(this.sel, options);
        return map;
    }

    requestData(lat = 33.450701, lng = 126.570667, addr = '', radius = 3000) {
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
            headers: this.apiInfoParams.headers
        }
        return fetch(this.apiInfoParams.url, options).then(d => d.json());
    }

    addMarker(coord, imgsrc = '', contents = []) {
        const imgsize = new kakao.maps.Size(64, 69)
        const imgOption = {
            offset: new kakao.maps.Point(27, 69)
        }
        const markerImg = new kakao.maps.MarkerImage(imgsrc, imgsize, imgOption)

        const marker = new kakao.maps.Marker({
            position: coord,
            image: markerImg
        })
        marker.setMap(this.map)
        kakao.maps.event.addListener(marker, 'click', (e) => {
            this.markerClick(e, contents)
        })
        return marker
    }
    addEvMarkerArray(data) {
        const addrArray = []
        data.map(d => {
            if (d === undefined) {
                return false
            }
            const addr = d.addr
            if (!Object.keys(this.evData).includes(addr)) {
                this.evData[addr] = []
            }
            this.evData[addr].push(d)
            if (addrArray.includes(addr)) {
                return false
            }
            const coord = new kakao.maps.LatLng(d.lat, d.lng)
            const marker = this.addMarker(coord, marker_ev, this.evData[addr])
            this.evMarkerArray.push(marker)
            addrArray.push(addr)

        })
    }
    removeEvMarkerArray() {
        this.evMarkerArray.map(m => {
            if (m !== undefined) {
                m.setMap(null)
            }
        })
        return false
    }


    getCoordToAddr(e) {
        this.geocoder.coord2Address(e.latLng.getLng(), e.latLng.getLat(), (resp) => {

            const addr = resp[0].address.address_name
            this.requestData(e.latLng.getLat(), e.latLng.getLng(), addr, this.radius).then(d => this.addEvMarkerArray(d.data));

        })
    }

    moveMap(latLng) {
        this.map.panTo(latLng)
    }

    mapClick(callback) {
        kakao.maps.event.addListener(this.map, 'click', (e) => {
            callback(e)
        })
    }

    markerClick(e, contents = []) {
        console.log(contents)
    }


    drawCircle(lat, lng) {
        var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(lat, lng), // 원의 중심좌표 입니다 
            radius: 3000, // 미터 단위의 원의 반지름입니다 
            strokeWeight: 5, // 선의 두께입니다 
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'dashed', // 선의 스타일 입니다
            fillColor: '#CFE7FF', // 채우기 색깔입니다
            fillOpacity: 0.7 // 채우기 불투명도 입니다   
        });
        circle.setMap(this.map)
        return circle
    }

    removeCircle(){
        this.circle.setMap(null)
    }

    moveCircle(e){
        this.circle.setPosition(e.latLng)
        this.circle.setMap(this.map)
    }


}

export default EvCharge