import "./Suggestions.css";

interface SuggestionsProps {
  suggestions: string[];
  handleSelectedOption: (option: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * The autocomplete suggestions
 *
 * @param suggestions          The suggestions to display
 * @param handleSelectedOption A function to handle an option being clicked
 * @param activeIndex          The current active option index
 * @param setActiveIndex       A function to set the active index
 * @returns JSX.Element
 */
const Suggestions = ({
  suggestions,
  handleSelectedOption,
  activeIndex,
  setActiveIndex: setActiveSuggestionIndex
}: SuggestionsProps) => {
  return (
    <div className="suggestions" data-testid="suggestions">
      {suggestions.length > 0 ? (
        <ul className="suggestionsList">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSelectedOption(suggestion)}
              className={`suggestion ${index === activeIndex ? "active" : ""}`}
              onMouseOver={() => setActiveSuggestionIndex(index)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <div className="noOptions">No options</div>
      )}
    </div>
  );
};

export default Suggestions;
