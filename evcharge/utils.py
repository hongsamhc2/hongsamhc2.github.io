import json
import xmltodict
import bs4
import requests


def xml_to_json(response):
    response = response.encode('utf-8')
    xmlobj = bs4.BeautifulSoup(response, 'lxml-xml')
    xmlstr = str(xmlobj)
    parsed_dict = xmltodict.parse(xmlstr)
    data = json.dumps(parsed_dict)
    data = json.loads(data)
    return data

def get_access_token(api_key='b254e4a848204b0abdc4',secret_key='02a332ba4b96485bb62d'):
    url = 'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?'
    url += f'consumer_key={api_key}'
    url+='&'
    url += f'consumer_secret={secret_key}'
    r = requests.get(url)
    rt = r.text
    result = json.loads(rt)['result']
    return result

def get_geocoding(address='서울특별시 서대문구 세검정로 94-1 , 2층, 3층 (홍제동 279-23)',pagenum='0',resultcount='50',accessToken=None):
    if accessToken is None:
        accessToken = get_access_token()['accessToken']
    url = 'https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?'
    url += f'accessToken={str(accessToken)}&'
    url += f'address={str(address)}&'
    url += f'pagenum={str(pagenum)}&'
    url += f'resultcount={str(resultcount)}&'
    r = requests.get(url)
    r = json.loads(r.text)['result']
    
    
    url = 'https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json?'
    url += f'accessToken={str(accessToken)}&'
    url += f'src={str("5179")}&'
    url += f'dst={str("4166")}&'
    url += f'posX={str(r["resultdata"][0]["x"])}&'
    url += f'posY={str(r["resultdata"][0]["y"])}&'
    c = requests.get(url)
    c = json.loads(c.text)['result']
    r.update(c)
    return c

print(get_geocoding('제주특별자치도 제주시 노형동 919-1'))

from math import sin, cos, sqrt, atan2, radians

# approximate radius of earth in km
R = 6373.0

lat1 = radians(33.484743248135956)
lon1 = radians(126.48050924758213)
lat2 = radians(33.4853)
lon2 = radians(126.4815)

dlon = lon2 - lon1
dlat = lat2 - lat1
print('div lat',float(dlat / 2))
print('sin lat',sin(dlat / 2))
print('sin lat squared',sin(dlat / 2)**2)
print('cos(lat1)',cos(lat1))
print('cos(lat2)',cos(lat2))
print('cos(lat1) * cos(lat2) * sin(dlon / 2)**2',cos(lat1) * cos(lat2) * sin(dlon / 2)**2)
a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2

print(a,a)
c = 2 * atan2(sqrt(a), sqrt(1 - a))

distance = R * c

print("Result:", distance)
print("Should be:", 278.546, "km")