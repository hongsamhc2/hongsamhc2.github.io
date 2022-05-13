import requests
import utils
import db
import argparse
import json

class EvCharge:
    p = utils.progress()
    def __init__(self):
        pass

    def getInfoData(self,servicekey,pageNo='1',numOfRows='9999'):
        url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo'
        params ={'serviceKey' : str(servicekey), 'pageNo' : str(pageNo), 'numOfRows' : str(numOfRows)}
        response = requests.get(url, params=params)
        return response

    def getInfoFullData(self,servicekey,endPageNo=210):
        self.p.init(1)
        db.create_index()
        result = []
        for i in range(1,int(endPageNo)):
            self.p.bar()
            response = self.getInfoData(servicekey,pageNo=i)
            json_data = utils.xml_to_json(response.text)
            header = json_data['response']['header']
            numOfRows = int(header['numOfRows'])
            if numOfRows>0:
                items = json_data["response"]['body']['items']['item']
                result += items
            else:
                print(f'numOfRows = {numOfRows}')
                break
        print(f'Get Full DataSets {len(result)} Done')
        return result
    
    def insertMongo(self,data=[]):
        self.p.init(1)
        for d in data:
            db.update_one(d,d)
            self.p.bar()
        print(f'Get Full DataSets {len(data)} Done')

    def importMongo(self,filepath='./data/evcharge.json'):
        with open(filepath,'r',encoding='utf-8') as f:
            data = json.load(f)
        db.create_index()
        self.insertMongo(data)
        return data
    
    def exportMongo(self,filepath='./data/evcharge.json'):
        data = db.find()
        with open(filepath,'w',encoding='utf-8') as f:
            json.dump(data,f)

    def selectData(self,lat=33.484743248135956,lng=126.48050924758213,addr='제주특별자치도 제주시',radius=3000):
        query = []
        ilat = {'$degreesToRadians':float(lat)}
        ilng = {'$degreesToRadians':float(lng)}
        radius = radius/1000
        if addr:
            match = {'$match':{'$text':{'$search':addr}}}
            query.append(match) 
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
        query.append(addFieldDistance)
        query.append({'$match':{'distance':{'$lte':radius}}})
        query.append({'$sort':{'distance':1,'chargeId':1}})
        query.append({'$project':{'_id':0}})
        # query.append({'$group':{'_id':'$addr','statNm':{'$addToSet':'$statNm'},'chgerId':{'$addToSet':'$chgerId'}}})
        result = db.aggregate(query)
        return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--servicekey',default='',help="OPEN API service key")
    parser.add_argument('--exec',default='',help="Excute Function")
    parser.add_argument('--filepath',default='./data/evcharge.json',help="Excute Function")
    args =parser.parse_args()

    exec = args.exec
    servicekey = args.servicekey
    filepath = args.filepath

    evc = EvCharge()
    
    if exec =='full':
        if servicekey !="":
            print('Start Get Full DataSets')
            data = evc.getInfoFullData(servicekey,210)
            evc.insertMongo(data)
        else:
            print('Service Key is required')
    elif exec =='import':
        evc.importMongo(filepath=filepath)
    elif exec =='export':
        evc.exportMongo(filepath=filepath)
    else:
        print('Not Work')
    
    
