import requests
from os import getenv

# TMDB API key (you need to sign up for an API key from TMDB)
API_KEY = getenv("API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
POPULAR_MOVIES_URL = f"{BASE_URL}/discover/movie?sort_by=popularity.desc&api_key={API_KEY}&page="
MOVIE_DETAILS_URL = f"{BASE_URL}/movie/{{}}/credits?api_key={API_KEY}"
ACTOR_DETAILS_URL = f"{BASE_URL}/person/{{}}?api_key={API_KEY}"

# Function to fetch popular movies from multiple pages
def fetch_popular_movies(pages=5):
    movies = []
    for page in range(1, pages + 1):
        response = requests.get(POPULAR_MOVIES_URL + str(page))
        data = response.json()
        if response.status_code == 200:
            movies.extend(data['results'])
        else:
            print(f"Error fetching data from page {page}")
    return movies

# Function to fetch actor details
def fetch_actor_details(actor_id):
    response = requests.get(ACTOR_DETAILS_URL.format(actor_id))
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching actor data for actor {actor_id}")
        return {}

# Function to fetch actor data for a movie
def fetch_movie_cast(movie_id):
    response = requests.get(MOVIE_DETAILS_URL.format(movie_id))
    if response.status_code == 200:
        cast = response.json().get('cast', [])
        actors = []
        for actor in cast:
            if actor['known_for_department'] == 'Acting':
                actor_details = fetch_actor_details(actor['id'])
                if actor_details:
                    actors.append(actor_details)
        return actors   
    else:
        print(f"Error fetching cast data for movie {movie_id}")
        return []

# Function to save movies and actors (this assumes you're saving them in MongoDB)
def process_movies_and_actors(movies, db):
    existing_cast = []
    for movie in movies:
        print(f"Processing movie: {movie['title']}")

        # Save movie data (you can modify this to match your MongoDB model)
        movie_data = {
            'id': movie['id'],
            'title': movie['title'],
            'overview': movie['overview'],
            'popularity': movie['popularity'],
            'release_date': movie['release_date'],
            'cast': [],  # We'll add actors later
            'images': [f"https://image.tmdb.org/t/p/w500{movie.get('poster_path', "")}", f"https://image.tmdb.org/t/p/w500{movie.get('backdrop_path', "")}"]
        }

        # Fetch actors for the movie
        cast = fetch_movie_cast(movie['id'])

        # Save actors and update movie cast with actor ids (you can modify this to match your MongoDB model)
        actor_ids = []
        for actor in cast:
            actor_data = {
                'id': actor['id'],
                'name': actor['name'],
                'biography': actor.get('biography', ''),
                'birthdate': actor.get('birthday', ''),
                'pob': actor.get('place_of_birth', ''),
                'gender': actor.get('gender', 0),
                'popularity': actor.get('popularity', 0),
                'images': [actor.get('profile_path', '')]
            }
            
            # Check that actor_data has no missing fields
            if not all(actor_data.values()):
                continue

            if not actor_data['id'] in existing_cast:
                # Save actor data
                db.Actor.insert_one(actor_data)
                existing_cast.append(actor_data['id'])

            actor_ids.append(actor['id'])

        # Update movie cast with actor ids
        movie_data['cast'] = actor_ids

        # Save movie data
        db.Movie.insert_one(movie_data)
        print(f"Saved movie: {movie['title']}, with {len(actor_ids)} actors")
    
    print(f"Processed {len(movies)} movies and {len(existing_cast)} actors")
