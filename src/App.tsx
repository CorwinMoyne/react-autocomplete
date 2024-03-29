import { useEffect, useState } from "react";
import "./App.css";
import { getMovies } from "./api/movies";
import { Autocomplete } from "./components";

function App() {
  const [movie, setMovie] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  /**
   * Returns a list of movies to display
   *
   * @param query The search query
   */
  async function initMovies() {
    try {
      const movies = await getMovies();      
      setOptions(movies);
    } catch (error) {
      console.error(error);
      // Handle error here, possibly with a toast or an inline error
    }
  }

  /**
   * Handles selected movie change
   * 
   * @param movie The selected movie
   */
  function handleMovieChange(movie: string) {
    setMovie(movie);
  }

  useEffect(() => {
    initMovies();
  }, []);

  return (
    <section>
      <div className="autocompleteContainer">
        <div>Movie Search</div>
        <Autocomplete
          placeholder="Movie search"
          options={options}
          onChange={handleMovieChange}
          value={movie}
        />
      </div>
    </section>
  );
}

export default App;
