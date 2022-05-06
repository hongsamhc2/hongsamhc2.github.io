import requests
import utils
import db



SERVICE_KEY = ''
def getData(SERVICE_KEY,pageNo=1):
    url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo'
    params ={'serviceKey' : SERVICE_KEY, 'pageNo' : pageNo, 'numOfRows' : '9999' }

    response = requests.get(url, params=params)
    return response




for i in range(1,210):
    response = getData(SERVICE_KEY,pageNo=i)
    json_data = utils.xml_to_json(response.text)
    print(json_data)
    
    
    header = json_data['response']['header']
    numOfRows = int(header['numOfRows'])
    if numOfRows>0:
        items = json_data["response"]['body']['items']['item']
        print(len(items))
        for item in items:
            db.update_one(item,item)
            
    else:
        print(f'numOfRows = {numOfRows}')
        break
    

    
    
db.info.aggregate([{'$match':{'addr':"제주특별자치도 제주시 노연로 12"}},
                   {'$addFields':{'lng':{'$degreesToRadians' : {'$convert':{'input':'$lng','to':19}}}}},
                   {'$addFields':{'lat':{'$degreesToRadians' : {'$convert':{'input':'$lat','to':19}}}}},
                   {'$addFields':{'lat2div':{'$divide':[{'$subtract':['$lat',{'$degreesToRadians':33.484743248135956}]},2]}}},
                   {'$addFields':{'sinslat':{ '$sin' : "$lat2div" }}},
                   {'$addFields':{'powsinslat':{ '$pow' : ['$sinslat',2] }}},
                   
                   
                   {'$addFields':{'coslat1':{ '$cos' : '$lat' }}},
                   {'$addFields':{'coslat2':{ '$cos' : {'$degreesToRadians':33.484743248135956}} }},
                   
                   
                     {'$addFields':{'lng2div':{'$divide':[{'$subtract':[{'$degreesToRadians':126.48050924758213},'$lng']},2]}}},
                   {'$addFields':{'sinslng':{ '$sin' : "$lng2div" }}},
                   {'$addFields':{'powsinslng':{ '$pow' : ['$sinslng',2] }}},
                   
                   
                   {'$addFields':{'mulcoslat':{ '$multiply' : ['$coslat1','$coslat2','$powsinslng']} }},
                   {'$addFields':{'addLat':{ '$add' : ['$powsinslat','$mulcoslat']} }},
                   
                 
                   
                   
                   {'$addFields':{'sqrt1':{ '$sqrt' :'$addLat'} }},
                   {'$addFields':{'sqrt2':{ '$sqrt' :{'$subtract':[1,'$addLat']}} }},
                   {'$addFields':{'atan2':{ '$atan2':['$sqrt1','$sqrt2']} }},
                   
                   {'$addFields':{'datan2':{ '$multiply':[2,'$atan2']} }},
                   {'$addFields':{'distance':{ '$multiply':[6373.0,1000.0,'$datan2']} }},
                   
                   ])
                   #{'$addFields':{'mullatlng':{ '$multiply' : ['$powsinslat','$powsinslng']} }},

#R = 6373.0

      #    {'$addFields':{'slng':{'$subtract':['$lng',120.0]}}},
                #    {'$addFields':{'slat':{'$subtract':['$lat',30.0]}}},
# subtract : {'$subtract':['$lng',120.0]}