import ChargeDetail from "./chargeDetail.js";
import React, { useEffect, useCallback, useState } from "react";
import marker_cur from "../../resources/svg/marker_cur.svg";
import marker_ev from "../../resources/svg/marker_ev.svg";
import ChargeList from "./chargeList";
import { getCurrentPos, requestInfoData, getCoordToAddr } from "./utils";
import SearchPlace from "./searchPlace.js";
const Map = () => {
  const { kakao } = window;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 33.450701, lng: 126.570667 });
  const [click, setClick] = useState(false);
  const [evMarkerArray, setEvMarkerArray] = useState([]);
  const [evData, setEvData] = useState({});
  const [curCircle, setCurCircle] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [detail, setDetail] = useState([]);
  const [addr,setAddr] = useState('제주특별자치도 제주시')

  const onClose = useCallback((c) => {
    setDetail([]);
    if (c === true) {
      window.history.back(1);
    }
  }, []);
  const onListItemClick = useCallback(
    (e, v) => {
      const kakaoCoord = new kakao.maps.LatLng(v[0].lat, v[0].lng);
      kakaoMap.panTo(kakaoCoord);
      setDetail(v);
      window.history.pushState(null, "");
    },
    [kakaoMap]
  );
  const researchMap = useCallback(
    (addr, lat, lng) => {
      const kakaoCoord = new kakao.maps.LatLng(lat, lng);
      curCircle.setPosition(kakaoCoord);
      curCircle.setMap(kakaoMap);

      kakaoMap.panTo(kakaoCoord);
        curMarker.setMap(null)
      setCoord({lat:parseFloat(lat),lng:parseFloat(lng)})
      setClick(true)
    },
    [kakaoMap, curCircle, curMarker,coord]
  );

  useEffect(() => {
    getCurrentPos({
      ...coord,
      callback: (coord) => {
        const kakaoCoord = new kakao.maps.LatLng(coord.lat, coord.lng);
        const mapInit = {
          center: kakaoCoord,
          level: 4,
          disableDoubleClickZoom: true, // 지도 더블클릭 시 zoom 기능 막기
        };
        const container = document.getElementById("map");
        const map = new kakao.maps.Map(container, mapInit);
        let cur_circle = drawCircle(kakao, map, kakaoCoord);
        setCurCircle(cur_circle);
        getCoordToAddr(coord, (addr) => {
          requestInfoData(
            { coord: { ...coord, addr: addr, radius: 3000 } },
            (data) => {
              const { evData, evMarkerArray } = addEvMarkerArray(
                kakao,
                map,
                data,
                setDetail
              );
              setAddr(addr)
              setEvMarkerArray(evMarkerArray);
              setEvData(evData);
            }
          );
        });
        setKakaoMap(map);
        setCoord(coord);
      },
    });
  }, []);

  useEffect(() => {
    if (kakaoMap !== null) {
      const kakaoCoord = new kakao.maps.LatLng(coord.lat, coord.lng);
      let cur_marker = addMarker(
        kakao,
        kakaoMap,
        kakaoCoord,
        marker_cur,
      );
      setCurMarker(cur_marker)

      kakao.maps.event.addListener(kakaoMap, "dblclick", (e) => {
        curCircle.setPosition(e.latLng);
        curCircle.setMap(kakaoMap);
        removeMarker(cur_marker);
        kakaoMap.panTo(e.latLng);
        cur_marker = addMarker(
          kakao,
          kakaoMap,
          e.latLng,
          marker_cur
        );
        setClick(true);
        setCoord({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
      });
    }
  }, [coord, kakaoMap, curCircle]);
  useEffect(() => {
    if (click) {
      evMarkerArray.map(removeMarker);
      getCoordToAddr(coord, (addr) => {
        requestInfoData(
          { coord: { ...coord, addr: addr, radius: 3000 } },
          (data) => {
            const { evData, evMarkerArray } = addEvMarkerArray(
              kakao,
              kakaoMap,
              data,
              setDetail
            );
            setAddr(addr)
            setEvMarkerArray(evMarkerArray);
            setEvData(evData);
          }
        );
      });
      setClick((prev) => !prev);
    }
  }, [coord, kakaoMap, click, evMarkerArray]);
  return (
    <>
      <ChargeDetail data={detail} onClose={onClose} />
      <div id="map"></div>
      <SearchPlace onClick={researchMap} placeholder={addr} />
      <ChargeList
        data={evData}
        onClick={(e, v) => {
          onListItemClick(e, v);
        }}
        current={()=>{
            getCurrentPos({
                ...coord,
                callback: (coord) => {
                    researchMap(addr,coord.lat,coord.lng)
                }})
        }}
      />
    </>
  );
};

const addMarker = (kakao, map, coord, imgsrc) => {
  const imgsize = new kakao.maps.Size(64, 69);
  const imgOption = {
    offset: new kakao.maps.Point(27, 69),
  };
  const markerImg = new kakao.maps.MarkerImage(imgsrc, imgsize, imgOption);

  const marker = new kakao.maps.Marker({
    position: coord,
    image: markerImg,
  });
  marker.setMap(map);
  return marker;
};

const addEvMarkerArray = (kakao, map, data, callback = () => {}) => {
  const addrArray = [];
  const evData = {};
  const evMarkerArray = [];

  data.map((d) => {
    if (d === undefined) {
      return false;
    }
    const addr = d.addr;
    if (!Object.keys(evData).includes(addr)) {
      evData[addr] = [];
    }
    evData[addr].push(d);
    if (addrArray.includes(addr)) {
      return false;
    }
    const kakaoCoord = new kakao.maps.LatLng(d.lat, d.lng);
    const marker = addMarker(kakao, map, kakaoCoord, marker_ev, callback);
    evMarkerArray.push(marker);
    addrArray.push(addr);
    var iwContent = `<div className="infowindow" style="text-align:center;width:${
      addr.length * 14
    }px;height:auto"><span>${addr}</span></div>`;

    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      infowindow.open(map, marker);
    });
    kakao.maps.event.addListener(marker, "mouseout", () => {
      infowindow.close();
    });
    kakao.maps.event.addListener(marker, "click", (e) => {
      map.panTo(kakaoCoord);
      callback(evData[addr]);
      window.history.pushState(null, "");
    });
  });
  return {
    evData: evData,
    evMarkerArray: evMarkerArray,
  };
};

const drawCircle = (kakao, map, coord) => {
  var circle = new kakao.maps.Circle({
    center: coord,
    radius: 3000,
    strokeWeight: 5,
    strokeColor: "#75B8FA",
    strokeOpacity: 1,
    strokeStyle: "dashed",
    fillColor: "#CFE7FF",
    fillOpacity: 0.4,
  });
  circle.setMap(map);
  return circle;
};

const removeMarker = (marker) => {
  if (marker === null) return;
  if (typeof marker.setMap !== "function") return;
  marker.setMap(null);
};

export default Map;
