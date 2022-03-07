from flask import Flask,Blueprint,request,jsonify
import requests
import os
upload_dir ="./upload"
api_app = Blueprint('api_app', __name__, url_prefix='/api')

@api_app.route('/fileupload',methods=['POST', 'GET'])
def fileupload():
    file = request.files.getlist('file')
    print(file)
    if not os.path.exists(upload_dir):
        os.mkdir(upload_dir)
    for i,f in enumerate(file):
        f.save(os.path.join(upload_dir,str(i)))

    
    return jsonify({"result":"Asdasdasda"})