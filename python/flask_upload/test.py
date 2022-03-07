from urllib.request import urlopen,Request
from lxml import html
from urllib.parse import urlencode,quote_plus,unquote
import requests
import bs4
import json
import xmltodict
import xml.etree.ElementTree as et
url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'
key = '85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv%2FN4aY6wdkDHWNvzieim1yz98A%3D%3D'
queryParams = '?' + urlencode({ quote_plus('serviceKey') : unquote(key), quote_plus('startCreateDt') : '20210801', quote_plus('endCreateDt') : '20210801'})
response = requests.get(url + queryParams).text.encode('utf-8')
xmlobj = bs4.BeautifulSoup(response, 'lxml-xml')
xmlstr =  str(xmlobj)
xmltree = et.fromstring(xmlstr)
rootTag = xmltree.tag
s = xmlobj.find(rootTag)
parsed_dict = xmltodict.parse((str(s)))

aa =json.dumps(parsed_dict)
aa= json.loads(aa)
print(aa)


