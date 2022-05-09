import {
    apiInfoUrl
} from "./api";

class EvCharge {
    constructor(sel = "#map") {
        this.sel = document.querySelector(sel);
        this.level = 6;
        this.data = [];
        this.apiInfoParams = apiInfoUrl();
    }

    init() {
        const map = this.drawMap();
        this.requestData().then(d=>console.log(d));
        return this;
    }

    drawMap() {
        var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: this.level,
        };
        var map = new kakao.maps.Map(this.sel, options);
        return map;
    }

    requestData(lat=33.450701, lng=126.570667, addr='', radius=30000) {
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
            header:this.apiInfoParams.header
        }
        const a = fetch(this.apiInfoParams.url,options).then(d=>d.json());
        return a
    }
}

export default EvCharge;