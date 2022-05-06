from flask import Flask,jsonify,request
from flask_cors import CORS
import evchargeinfo as ev

app = Flask(__name__, static_url_path='/static')
CORS(app)

@app.route('/ev/info',methods=['GET','POST'])
def evinfo():
    if request.method=="POST":
        
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
    