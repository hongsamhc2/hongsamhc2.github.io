import './resources/css/reset.css'
import './resources/css/font.css'
import './resources/css/app.css'
import marker_cur from './resources/svg/marker_cur.svg'
import EvCharge from './evcharge.js'





const evc = new EvCharge('#map')
evc.init()
evc.mapClick((e) => {
    evc.removeEvMarkerArray()
    evc.removeCircle()
    evc.currentMarker.setMap(null)
    evc.currentMarker = evc.addMarker(new kakao.maps.LatLng(e.latLng.getLat(), e.latLng.getLng()), marker_cur)
    evc.moveMap(e.latLng)
    evc.moveCircle(e)
    evc.getCoordToAddr(e)
})