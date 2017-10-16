from flask import Flask, render_template, jsonify

import json


application = Flask(__name__)
app = application


with open("data/schemeData.json") as scheme_file:
    scheme_data = json.load(scheme_file)

with open("data/planeData.json") as plane_file:
    plane_data = json.load(plane_file)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/scheme-cards.json")
def get_scheme_cards():
    return jsonify(scheme_data["data"])

@app.route("/plane-cards.json")
def get_plane_cards():
    return jsonify(plane_data["data"])


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()
