import { movies } from "../../mocks/movies";

/**
 * A fake api to return mock movies after 500 ms
 * 
 * @returns Promise<string[]>
 */
export async function getMovies(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(movies);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
}
