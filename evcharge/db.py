import pymongo

URI = "mongodb://localhost:27017/evcharge"
CLIENT = pymongo.MongoClient(URI)
def create_index(index=[('addr','text')],db='evcharge',collection='info'):
    CLIENT[db][collection].create_index(index)
def update_one(query={},update_query={},db='evcharge',collection='info',upsert=True):
    try:
        CLIENT[db][collection].update_one(query,{'$set':update_query},upsert=upsert)
    except Exception as e:
        state = {'msg':'fail','except':str(e)}
        print(state)

def find(query={},select_query={'_id':0},sort=[('_id',1)],limit=0,skip=0,db='evcharge',collection='info'):
    data =list(CLIENT[db][collection].find(query,select_query).sort(sort).limit(limit).skip(skip))
    return data



def aggregate(query,db='evcharge',collection='info'):
    data =list(CLIENT[db][collection].aggregate(query))
    return data


if __name__ =="__main__":
    query = []
    ilat = {'$degreesToRadians':33.484743248135956}
    ilng = {'$degreesToRadians':126.48050924758213}
    
    match = {'$match':{'$text':{'$search':'제주특별자치도 제주시 노연로'}}}
    dlng = {'$degreesToRadians' : {'$convert':{'input':'$lng','to':19}}}
    dlat = {'$degreesToRadians' : {'$convert':{'input':'$lat','to':19}}}
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
    
    query.append({'$match':{'distance':{'$lte':15}}})
    # query.append({'$group':{'_id':'$addr','statNm':{'$addToSet':'$statNm'},'chgerId':{'$addToSet':'$chgerId'}}})
    result = aggregate(query)

       
# db.info.aggregate([,
#                    {'$addFields':{'lng':{'$degreesToRadians' : {'$convert':{'input':'$lng','to':19}}}}},
#                    {'$addFields':{'lat':{'$degreesToRadians' : {'$convert':{'input':'$lat','to':19}}}}},
#                    {'$addFields':{'lat2div':{'$divide':[{'$subtract':['$lat',{'$degreesToRadians':33.484743248135956}]},2]}}},
#                    {'$addFields':{'sinslat':{ '$sin' : "$lat2div" }}},
#                    {'$addFields':{'powsinslat':{ '$pow' : ['$sinslat',2] }}},
                   
                   
#                    {'$addFields':{'coslat1':{ '$cos' : '$lat' }}},
#                    {'$addFields':{'coslat2':{ '$cos' : {'$degreesToRadians':33.484743248135956}} }},
                   
                   
#                      {'$addFields':{'lng2div':{'$divide':[{'$subtract':[{'$degreesToRadians':126.48050924758213},'$lng']},2]}}},
#                    {'$addFields':{'sinslng':{ '$sin' : "$lng2div" }}},
#                    {'$addFields':{'powsinslng':{ '$pow' : ['$sinslng',2] }}},
                   
                   
#                    {'$addFields':{'mulcoslat':{ '$multiply' : ['$coslat1','$coslat2','$powsinslng']} }},
#                    {'$addFields':{'addLat':{ '$add' : ['$powsinslat','$mulcoslat']} }},
                   
                 
                   
                   
#                    {'$addFields':{'sqrt1':{ '$sqrt' :'$addLat'} }},
#                    {'$addFields':{'sqrt2':{ '$sqrt' :{'$subtract':[1,'$addLat']}} }},
#                    {'$addFields':{'atan2':{ '$atan2':['$sqrt1','$sqrt2']} }},
                   
#                    {'$addFields':{'datan2':{ '$multiply':[2,'$atan2']} }},
#                    {'$addFields':{'distance':{ '$multiply':[6373.0,1000.0,'$datan2']} }},
                   
#                    ])
    
    
    