import traceback

import os
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request

app = Flask(__name__)

cred = credentials.Certificate("firebase_cert.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
url_database = db.collection('urls')


@app.route('/read', methods=['GET'])
def read_data():
    try:
        short_url = request.args['short-url']
        url_data = url_database.document(short_url).get()
        return url_data.to_dict()['long-url'], 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/save', methods=['POST'])
def save_data():
    try:
        json = request.json
        json['id'] = json['short-url']
        json['views'] = 0
        url_database.document(json['id']).set(json)
        return 'Success', 200
    except Exception as e:
        return f"An Error Occurred: {traceback.format_exc()}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
