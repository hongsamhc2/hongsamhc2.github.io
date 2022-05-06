
import db 
def get_info(lat=33.484743248135956,lng=126.48050924758213,addr='제주특별자치도 제주시',radius=3000):
    query = []
    ilat = {'$degreesToRadians':float(lat)}
    ilng = {'$degreesToRadians':float(lng)}
    radius = radius/1000
    match = {'$match':{'$text':{'$search':addr}}}
    dlng = {'$degreesToRadians' : {'$convert':{'input':'$lng','to':1}}}
    dlat = {'$degreesToRadians' : {'$convert':{'input':'$lat','to':1}}}
    latDiv2 = {'$divide':[{'$subtract':[dlat,ilat]},2]}
    sinLat = {'$sin':latDiv2}
    powSinLat = { '$pow' : [sinLat,2] }
    cosDlat = {'$cos':dlat}
    cosIlat = {'$cos':ilat}
    lngDiv2 = {'$divide':[{'$subtract':[dlng,ilng]},2]}
    sinLng={ '$sin' : lngDiv2 }
    powSinLng={ '$pow' : [sinLng,2] }
    mulcoslat={ '$multiply' : [cosDlat,cosIlat,powSinLng]}
    addCosLat = { '$add' : [mulcoslat,powSinLat]} 
    
    addCosLatSqrt={ '$sqrt' :addCosLat},
    subCosLatSqrt={ '$sqrt' :{'$subtract':[1,addCosLat]}} 
    atan2={ '$atan2':[addCosLatSqrt[0],subCosLatSqrt]}
    doubleAtan2 = { '$multiply':[2,atan2]} 
    distance = { '$multiply':[6373.0,doubleAtan2]}
    addFieldDistance =  {'$addFields':{'distance':distance }}
    
    query.append(match)
    query.append(addFieldDistance)
    
    query.append({'$match':{'distance':{'$lte':radius}}})
    
    query.append({'$project':{'_id':0}})
    # query.append({'$group':{'_id':'$addr','statNm':{'$addToSet':'$statNm'},'chgerId':{'$addToSet':'$chgerId'}}})
    result = db.aggregate(query)
    return result