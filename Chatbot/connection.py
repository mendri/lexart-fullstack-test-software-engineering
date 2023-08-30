from pymongo import MongoClient
from dotenv import dotenv_values


def get_database():
    CONNECTION_STRING = dotenv_values()["CONNECTION_STRING"]
    client = MongoClient(CONNECTION_STRING)

    return client["chatbot_data"]


if __name__ == "__main__":
    dbname = get_database()
