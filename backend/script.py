import requests
import json

BASE_URL = "https://api.themoviedb.org/3"
HEADERS = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzdlMTkwY2U1N2ZhMGJlNTIwOGMwMmFjODgyNWY1MSIsInN1YiI6IjY1MzlmODg5MDkxZTYyMDBmZWM2M2Q4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDaHIxHdJkemN3HtwLbe3Jxejd4ypZk_t0eY-_oRkmc',
    'accept': 'application/json'
}
print("1")
def get_movie_details(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}?language=en-US", headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        return None
print("2")
def get_movie_images(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}/images", headers=HEADERS)
    if response.status_code == 200:
        return response.json().get('backdrops', [])[:5]
    else:
        return []
    
POST_HEADERS = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfUk9PVCIsIm5hbWUiOiJ1bmRlZmluZWQiLCJsYXN0X25hbWUiOiJ1bmRlZmluZWQiLCJzdWIiOiJ1bmRlZmluZWRAZ21haWwuY29tIiwiaWF0IjoxNjk5NDk2NDY0LCJleHAiOjE2OTk1MzI0NjR9.IfHKBbHicMnSx17AqKZPuEJI6NwMLE5f8hdTPzzid4U',
    'Content-Type': 'application/json'
}
print("3")
def main():
    for page in range(36, 60):
        response = requests.get(f"{BASE_URL}/trending/movie/week?language=es-ES&page={page}", headers=HEADERS)
        print("4")
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
                    
                    response = requests.post('http://18.118.7.75/api/movies', headers=POST_HEADERS, json=data_to_send)
                    print(f"Data for movie {movie['title']} sent. Response status: {response.status_code}")

if __name__ == "__main__":
    main()
