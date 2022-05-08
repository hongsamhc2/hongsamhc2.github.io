from flask import Flask,jsonify,request
from flask_cors import CORS
import evchargeinfo as ev
registered_url = ['http://127.0.0.1:48952','https://hongsamhc2.github.io']
app = Flask(__name__, static_url_path='/static')
CORS(app)

@app.route('/ev/info',methods=['GET','POST'])
def evinfo():
    host_url = request.host_url
    host_url = host_url[:-1] if host_url[-1] =='/' else host_url
    if host_url not in registered_url:
        return 'fail'
    if request.method=="POST":
        print(host_url)
        req = request.json
        if req is None:
            return 'false'
        lat = req['coord']['lat']
        lng = req['coord']['lng']
        addr = req['coord']['addr']
        radius = req['coord']['radius']
        result = ev.get_info(lat,lng,addr,radius)
        return jsonify({'data':result})


if __name__=="__main__":
    app.run(debug=True,port=48952)
    