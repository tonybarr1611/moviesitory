from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from os import getenv

URI = getenv("MONGO_URI")
    
def init_db():
    client = MongoClient(URI, server_api=ServerApi("1"))
    db = client.get_database("moviesitory")
    
    collections = db.list_collection_names()
    if "Actor" not in collections:
        db.create_collection("Actor")
        Actor = db.get_collection("Actor")
        Actor.create_index("id", unique=True)
    if "Movie" not in collections:
        db.create_collection("Movie")
        Movie = db.get_collection("Movie")
        Movie.create_index("id", unique=True)
        
    return db

