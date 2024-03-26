import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./Autocomplete.css";

interface AutocompleteProps {
  placeholder: string;
}

const Autocomplete = ({ placeholder }: AutocompleteProps) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query);

  console.log('debouncedQuery', debouncedQuery);
  
  return <input type="text" placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} />;
};

export default Autocomplete;
