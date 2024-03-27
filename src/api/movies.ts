import { movies } from "../../mocks/movies";

/**
 * A fake api to return mock movies after 500 ms
 * @param query The search query
 * @returns Promise<string[]>
 */
export async function getMovies(query?: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (query) {
          resolve(
            movies.filter((movie) =>
              movie.toLowerCase().includes(query.toLowerCase())
            )
          );
        } else {
          resolve(movies);
        }
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
}
