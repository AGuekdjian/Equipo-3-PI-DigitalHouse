import requests
import json

BASE_URL = "https://api.themoviedb.org/3"
HEADERS = {
    'Authorization': 'Bearer API_TOKEN',
    'accept': 'application/json'
}

def get_movie_details(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}?language=en-US", headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def get_movie_images(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}/images", headers=HEADERS)
    if response.status_code == 200:
        return response.json().get('backdrops', [])[:5]
    else:
        return []

def main():
    for page in range(1, 2):
        response = requests.get(f"{BASE_URL}/trending/movie/week?language=es-ES&page={page}", headers=HEADERS)
        if response.status_code == 200:
            movies = response.json().get('results', [])
            for movie in movies:
                details = get_movie_details(movie['id'])
                if details:
                    genre_name = details['genres'][0]['name'] if details['genres'] else ''
                    images = get_movie_images(movie['id'])
                    image_urls = [f"https://image.tmdb.org/t/p/original/{img['file_path']}" for img in images]
                    data_to_send = {
                        "title": movie['title'],
                        "overview": movie['overview'],
                        "genre": genre_name,
                        "image_urls": image_urls
                    }
                    
                    response = requests.post('http://localhost:8080/api/movie', headers={'Content-Type': 'application/json'}, json=data_to_send)
                    print(f"Data for movie {movie['title']} sent. Response status: {response.status_code}")

if __name__ == "__main__":
    main()
