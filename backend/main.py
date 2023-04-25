import traceback

import os
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request
from flask_cors import CORS, cross_origin

import random
import string

# Create the Flask Web server object
app = Flask(__name__)

# Set up CORS in order to be able to send requests from external servers
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Connect to database
cred = credentials.Certificate("firebase_cert.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
url_database = db.collection('urls')

# All ASCII (ie english) lowercase letters, used for URL generation
ascii_letters = string.ascii_lowercase


# Endpoint to get long url if you have a short one
# Gets data from connected DB
@app.route('/read', methods=['GET'])
@cross_origin()
def read_data():
    try:
        short_url = request.args['short_url']
        url_data = url_database.document(short_url).get()
        return url_data.to_dict()['long_url'], 200
    except Exception as e:
        return f"An Error Occurred: {e}"


# Method to save a new url
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


# Method to add a new url without being logged in
@app.route('/save-anon', methods=['POST'])
@cross_origin()
def save_anonymous():
# Requires JSON encoded long url as follows:
# { "long_url":"<LONG URL>" }

    try:
        json = request.json

        # Check if url already exists
        existing_entry = url_database.where(u'long_url', u'==', json['long_url']).get()
        if len(existing_entry) > 0:
            return existing_entry[0].id, 200

        # Save urls consistently (w/o https:// prefix)
        if 'https://' in json['long_url']:
            json['long_url'] = json['long_url'].replace('https://', '')
        elif 'http://' in json['long_url']:
            json['long_url'] = json['long_url'].replace('http://', '')
        short_url = ''.join(random.choice(ascii_letters) for i in range(6))

        json['id'] = short_url
        json['short_url'] = short_url
        json['views'] = 0
        json['user'] = "anon"

        # Save document to database
        url_database.document(json['id']).set(json)
        return short_url, 200
    except Exception as e:
        return f"An Error Occurred: {traceback.format_exc()}"


# Entrypoint
port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
