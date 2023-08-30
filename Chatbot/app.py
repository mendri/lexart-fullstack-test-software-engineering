from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import close_chat, get_response, initiate_chat, handle_login

app = Flask(__name__)
CORS(app)


@app.post("/predict")
def predict():
    request_json = request.get_json()
    if request_json["started"]:
        response = get_response(request_json["message"])
        return jsonify(response)
    else:
        response = initiate_chat(request_json["message"])
        return jsonify(response)


@app.post("/goodbye")
def goodbye():
    request_json = request.get_json()
    response = close_chat(
        request_json["username"],
        request_json["password"],
        request_json["message_history"],
    )
    return response


@app.post("/login")
def login():
    request_json = request.get_json()
    response = handle_login(request_json["username"], request_json["password"])
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=False)
