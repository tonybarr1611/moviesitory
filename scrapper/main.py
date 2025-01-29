from dotenv import load_dotenv
load_dotenv()

from mongoConnection import init_db
from tmdbConnection import fetch_popular_movies, process_movies_and_actors


def main():
    db = init_db()
    movies = fetch_popular_movies(5)
    process_movies_and_actors(movies, db)
    return   
 
if __name__ == "__main__":
    main()
