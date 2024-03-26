import "./App.css";
import { Autocomplete } from "./components";

function App() {
  return (
    <section>
      <div className="autocompleteContainer">
        <div>Movie Search</div>
        <Autocomplete placeholder="Movie search" />
      </div>
    </section>
  );
}

export default App;
