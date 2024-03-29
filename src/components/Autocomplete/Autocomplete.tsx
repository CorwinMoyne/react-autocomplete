import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./Autocomplete.css";
import Suggestions from "./Suggestions/Suggestions";

interface AutocompleteProps {
  placeholder: string;
  options: string[];
  onChange: (option: string) => void;
  value: string;
}

/**
 * The autocomplete component
 *
 * @param placeholder The placeholder text
 * @param options     The options to display
 * @param onChange    A function to handle change
 * @param value       The current value
 * @returns JSX.Element
 */
const Autocomplete = ({
  placeholder,
  options,
  onChange,
  value,
}: AutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const autocompleteWrapperRef = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebounce(value, 250);

  useEffect(() => {
    // Default filtered options to options
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    // Filter options when debouncedQuery updates
    if (!debouncedQuery) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [debouncedQuery, options]);

  useEffect(() => {
    // Close suggestions when click outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autocompleteWrapperRef.current &&
        !autocompleteWrapperRef.current.contains(event.target as Node)
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
   * Handles the input change event
   *
   * @param event The input event
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
    setShowSuggestions(true);
  }

  /**
   * Handles a value being selected
   *
   * @param option The selected option
   */
  function handleSelectedOption(option: string) {
    onChange(option);
    setShowSuggestions(false);
  }

  /**
   * Scrolls the selected option into view when using the arrow keys
   */
  function scrollOptionIntoView() {
    const selected = document.querySelector(".active");
    selected?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  /**
   * Handles arrow down key
   */
  function handleArrowDownKey() {
    setShowSuggestions(true);
    if (activeSuggestionIndex < filteredOptions.length - 1) {
      setActiveSuggestionIndex((prev) => prev + 1);
      scrollOptionIntoView();
    }
  }

  /**
   * Handles arrow up key
   */
  function handleArrowUpKey() {
    setShowSuggestions(true);
    if (activeSuggestionIndex > 0) {
      setActiveSuggestionIndex((prev) => prev - 1);
      scrollOptionIntoView();
    }
  }

  /**
   * Handles the enter key
   */
  function handleEnterKey() {
    if (showSuggestions) {
      handleSelectedOption(filteredOptions[activeSuggestionIndex]);
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
    <div ref={autocompleteWrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        data-testid="autocomplete-input"
      />
      {showSuggestions && (
        <Suggestions
          suggestions={filteredOptions}
          handleSelectedOption={handleSelectedOption}
          activeIndex={activeSuggestionIndex}
          setActiveIndex={setActiveSuggestionIndex}
          value={value}
        />
      )}
    </div>
  );
};

export default Autocomplete;
