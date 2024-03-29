import "./Suggestions.css";

interface SuggestionsProps {
  suggestions: string[];
  handleSelectedOption: (option: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  value: string;
}

/**
 * The autocomplete suggestions
 *
 * @param suggestions          The suggestions to display
 * @param handleSelectedOption A function to handle an option being clicked
 * @param activeIndex          The current active option index
 * @param setActiveIndex       A function to set the active index
 * @param value                The current search
 * @returns JSX.Element
 */
const Suggestions = ({
  suggestions,
  handleSelectedOption,
  activeIndex,
  setActiveIndex,
  value,
}: SuggestionsProps) => {
  /**
   * Returns matching text wrapped in bold tags
   *
   * @param suggestion The text to match
   * @returns string
   */
  function getHighlightedText(suggestion: string) {
    if (!value) {
      return suggestion;
    }
    return suggestion.replace(new RegExp(value, "gi"), (match: string) => `<b>${match}</b>`);
  }

  return (
    <div className="suggestions" data-testid="suggestions">
      {suggestions.length > 0 ? (
        <ul className="suggestionsList">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSelectedOption(suggestion)}
              className={`suggestion ${index === activeIndex ? "active" : ""}`}
              onMouseOver={() => setActiveIndex(index)}
              dangerouslySetInnerHTML={{
                __html: getHighlightedText(suggestion),
              }}
            ></li>
          ))}
        </ul>
      ) : (
        <div className="noOptions">No options</div>
      )}
    </div>
  );
};

export default Suggestions;
