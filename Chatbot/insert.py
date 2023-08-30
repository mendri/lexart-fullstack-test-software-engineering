from connection import get_database

dbname = get_database()


def find_user(username):
    collection_name = dbname["users"]
    user = collection_name.find_one({"username": username})
    return user


def insert_user(username, hash_pass, message_history):
    collection_name = dbname["users"]
    collection_name.insert_one(
        {
            "username": username,
            "password": hash_pass,
            "message_history": [message_history],
        }
    )


def update_user(username, message_history):
    collection_name = dbname["users"]
    collection_name.update_one(
        {"username": username}, {"$push": {"message_history": message_history}}
    )
