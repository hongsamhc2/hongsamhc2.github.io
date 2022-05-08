import json
import xmltodict
import bs4
import requests
import os

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

def exists_path(filepath=''):
    return os.path.exists(filepath)


class progress:
    def __init__(self):
        self.i = 0
    def bar(self):
        print(f'{self.i}\r',end='')
        self.i +=1
    def init(self,i=0):
        self.i = i