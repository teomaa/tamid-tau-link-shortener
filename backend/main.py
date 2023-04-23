import traceback

import os
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request
from flask_cors import CORS, cross_origin

import random
import string

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate("firebase_cert.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
url_database = db.collection('urls')

ascii_letters = string.ascii_lowercase


@app.route('/read', methods=['GET'])
@cross_origin()
def read_data():
    try:
        short_url = request.args['short_url']
        url_data = url_database.document(short_url).get()
        return url_data.to_dict()['long_url'], 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/save', methods=['POST'])
@cross_origin()
def save_data():
    try:
        json = request.json
        json['id'] = json['short_url']
        json['views'] = 0
        url_database.document(json['id']).set(json)
        return 'Success', 200
    except Exception as e:
        return f"An Error Occurred: {traceback.format_exc()}"


@app.route('/save-anon', methods=['POST'])
@cross_origin()
def save_anonymous():
# Requires JSON encoded long url as follows:
# { "long_url":"<LONG URL>" }
    try:
        json = request.json
        existing_entry = url_database.where(u'long_url', u'==', json['long_url']).get()
        if len(existing_entry) > 0:
            return 'URL already saved', 200

        short_url = ''.join(random.choice(ascii_letters) for i in range(6))

        json['id'] = short_url
        json['short_url'] = short_url
        json['views'] = 0
        json['user'] = "anon"
        url_database.document(json['id']).set(json)
        return 'Success', 200
    except Exception as e:
        return f"An Error Occurred: {traceback.format_exc()}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
