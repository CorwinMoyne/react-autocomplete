import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { getMovies } from "../../api/movies";
import { useDebounce } from "../../hooks/useDebounce";
import "./Autocomplete.css";
import Suggestions from "./Suggestions/Suggestions";

interface AutocompleteProps {
  placeholder: string;
}

/**
 * The autocomplete component
 *
 * @param placeholder The placeholder text
 * @returns JSX.Element
 */
const Autocomplete = ({ placeholder }: AutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebounce(query, 250);

  /**
   * Returns a list of suggestions to display
   *
   * @param query The search query
   */
  async function getSuggestions(query?: string) {
    try {
      const movies = await getMovies(query);
      setSuggestions(movies);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Get suggestions when debouncedQuery updates
    getSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    // Close suggestions when click outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  /**
   * Handles a value being selected
   *
   * @param option The selected option
   */
  function handleSelectedOption(option: string) {
    setQuery(option);
    setShowSuggestions(false);
  }

  /**
   * Handles arrow down key
   */
  function handleArrowDownKey() {
    setShowSuggestions(true);
    if (activeSuggestionIndex < suggestions.length - 1) {
      setActiveSuggestionIndex(prev => prev + 1)
    }
  }

  /**
   * Handles arrow up key
   */
  function handleArrowUpKey() {
    setShowSuggestions(true);
    if (activeSuggestionIndex > 0) {
      setActiveSuggestionIndex(prev => prev - 1)
    }
  }

  /**
   * Handles the enter key
   */
  function handleEnterKey() {
    if (showSuggestions) {
      handleSelectedOption(suggestions[activeSuggestionIndex]);
    }
  }

  /**
   * Handles keydown events
   * 
   * @param event The keyboard event
   */
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      handleArrowDownKey();
    } else if (event.key === "ArrowUp") {
      handleArrowUpKey();
    } else if (event.key === "Enter") {
      handleEnterKey();
    }
  }

  return (
    <div ref={autocompleteRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        data-testid="autocomplete-input"
      />
      {showSuggestions && (
        <Suggestions
          suggestions={suggestions}
          handleSelectedOption={handleSelectedOption}
          activeIndex={activeSuggestionIndex}
          setActiveIndex={setActiveSuggestionIndex}
        />
      )}
    </div>
  );
};

export default Autocomplete;
