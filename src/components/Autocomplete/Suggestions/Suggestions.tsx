import "./Suggestions.css";

interface SuggestionsProps {
  suggestions: string[];
  handleSelectedOption: (option: string) => void;
}

/**
 * The autocomplete suggestions
 * 
 * @param suggestions The suggestions to display 
 * @param handleSelectedOption A function to handle an option being clicked
 * @returns JSX.Element
 */
const Suggestions = ({
  suggestions,
  handleSelectedOption,
}: SuggestionsProps) => {  
  return (
    <div className="suggestions" data-testid="suggestions">
      {suggestions.length > 0 ? (
        <ul className="suggestionsList">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSelectedOption(suggestion)}
              className="suggestion"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <div>No options</div>
      )}
    </div>
  );
};

export default Suggestions;
