import json
from flask import Flask,jsonify,request
from flask_cors import CORS
from EvCharge import EvCharge 

registered_url = ['http://127.0.0.1:5500','http://localhost:8080']
ev = EvCharge()
app = Flask(__name__, static_url_path='/static')
CORS(app)

@app.route('/ev/info',methods=['GET','POST'])
def evinfo():
    origin_url = request.origin
    print(origin_url)
    if origin_url not in registered_url:
        return jsonify({'msg':'This URL is not registered'}),404
    if request.method=="POST":
        req = request.json
        if req is None:
            return 'false'
        lat = req['coord']['lat']
        lng = req['coord']['lng']
        addr = req['coord']['addr']
        radius = req['coord']['radius']
        result = ev.selectData(lat,lng,addr,radius)
        return jsonify({'data':result})


if __name__=="__main__":
    app.run(debug=True,port=48952)
    