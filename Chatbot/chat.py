import csv
import datetime
import random
import json
import hashlib

import torch
from insert import find_user, insert_user, update_user

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from nltk.tokenize import word_tokenize

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

with open("intents.json", "r") as json_data:
    intents = json.load(json_data)


goodbye_words = ["goodbye", "tchau", "até", "bye", "close", "encerrar"]


FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Lexart Bot"


def validate_login(username, password):
    return True


def handle_login(username, password):
    return {"logged": validate_login(username, password)}


def initiate_chat(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    if tag == "greeting":
        return random.choice(intents["intents"][0]["responses"])


def hashPass(password):
    hash_obj = hashlib.sha256()
    hash_obj.update(password.encode("utf-8"))

    return hash_obj.hexdigest()


def exportChatToCsv(username, message_history):
    field_names = ["title", "username", "date", "message"]
    conversations = []
    user_times = {}

    with open("historic_conversations.csv", encoding="utf-8") as file:
        reader = csv.DictReader(file, delimiter=",", quotechar='"')

        for row in reader:
            if row["username"] in user_times:
                user_times[row["username"]] += 1
            else:
                user_times[row["username"]] = 1

            conversation = {
                "title": row["title"],
                "username": row["username"],
                "date": row["date"],
                "message": row["message"],
            }
            conversations.append(conversation)

    actual_date = datetime.datetime.now()
    date = actual_date.strftime("%d/%m/%Y %H:%M")
    actual_user_times = (
        user_times[username] + 1 if username in user_times else 1
    )
    formated_title = (
        f"Conversation {username} #{actual_user_times} - {date}",
    )

    conversations.append(
        {
            "title": formated_title,
            "username": username,
            "date": date,
            "message": message_history,
        }
    )

    with open("historic_conversations.csv", "w", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=field_names)
        writer.writeheader()

        for conversation in conversations:
            writer.writerow(conversation)


def close_chat(username, password, message_history):
    if find_user(username) is None:
        insert_user(username, hashPass(password), message_history)
    else:
        update_user(username, message_history)

    exportChatToCsv(username, message_history)
    return {"answer": "Conversation saved"}


def detect_goodbye(msg):
    tokens = word_tokenize(msg.lower())
    for token in tokens:
        if token in goodbye_words:
            return True
    return False


def get_response(msg):
    if detect_goodbye(msg):
        return random.choice(intents["intents"][2]["responses"])

    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() >= 0.7:
        if tag == "greeting":
            return {
                "answer": "Hello again...",
                "response_type": "chatbot_answer",
                "started": True,
                "logged": True,
            }

        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return random.choice(intent["responses"])

    return {
        "answer": "I do not understand...",
        "response_type": "chatbot_answer",
        "started": True,
        "logged": True,
    }


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)
