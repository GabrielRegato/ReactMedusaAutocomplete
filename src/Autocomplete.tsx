import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
// Import .css styles
import "./Autocomplete.css";
// Import AutocompleteItem interface
import { AutocompleteItem } from "./types";

// Interface to get the correct properties for the component
interface AutocompleteProps {
  data: AutocompleteItem[];
  onSelect: (item: AutocompleteItem) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ data, onSelect }) => {
  // Get input value
  const [inputValue, setInputValue] = useState("");
  // Save data about suggestions
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
  // Save data about prevSuggestions
  const [prevSuggestions, setPrevSuggestions] = useState<AutocompleteItem[]>(
    []
  );
  // Save the status of the event focus
  const [isInputFocused, setIsInputFocused] = useState(false);
  // Save the activeIndex for suggestions list
  const [activeIndex, setActiveIndex] = useState(-1);

  // References for the input and the list
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* Event handlers */

  /*
  Handles input changes by updating the inputValue state, filtering the data from the endpoint,
  and updating the suggestions state with the filtered results. The filtered results are also
  used to create a highlightedLabel that boldens the matching text, which is then displayed to
  the user.
  */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const filteredData = data.filter((item) =>
      item.label.toLowerCase().includes(newValue.toLowerCase())
    );
    setPrevSuggestions(suggestions);
    setSuggestions(
      filteredData.map((item) => {
        const matchIndex = item.label
          .toLowerCase()
          .indexOf(newValue.toLowerCase());
        const highlightedLabel =
          matchIndex !== -1
            ? item.label.substring(0, matchIndex) +
              `<strong>${item.label.substring(
                matchIndex,
                matchIndex + newValue.length
              )}</strong>` +
              item.label.substring(matchIndex + newValue.length)
            : item.label;
        return {
          label: item.label,
          highlightedLabel,
          value: item.label,
        };
      })
    );
  };

  /*
  Handles keyboard events for the input field, allowing the user to navigate through the
  suggestions using the arrow keys and select an item by pressing Enter.
  */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "Enter" && activeIndex !== -1) {
      onSelect(suggestions[activeIndex]);
      setInputValue(suggestions[activeIndex].label);
      setSuggestions([]);
      setPrevSuggestions([]);
    }
  };

  /*
  Handles the selection of an item from the suggestions list, calling the onSelect callback
  with the selected item, updating the input value, and clearing the suggestions lists.
  */
  const handleItemClick = (item: AutocompleteItem) => {
    onSelect(item);
    setInputValue(item.label);
    setSuggestions([]);
    setPrevSuggestions([]);
  };

  /*
  Listens for clicks outside the input field and suggestions list, and when detected, clears
  the suggestions, saves the current suggestions for later, and sets the input focus to false.
  */
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (
        !inputRef.current?.contains(event.target as Node) &&
        !listRef.current?.contains(event.target as Node) &&
        suggestions.length > 0
      ) {
        setPrevSuggestions(suggestions);
        setSuggestions([]);
        setIsInputFocused(false);
      }
    },
    [inputRef, isInputFocused, listRef, suggestions]
  );

  /*
  Adds an event listener to the document to detect clicks outside the input field and suggestions
  list, and removes the listener when the component is unmounted to prevent memory leaks.
  */
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  /*
  Handles input focus and blur events to update the input focus state and restore previous
  suggestions when the input is focused again. Cleans up event listeners on component unmount
  to prevent memory leaks.
  */
  useLayoutEffect(() => {
    const handleInputFocus = () => {
      setIsInputFocused((prevFocused) => true);
      if (prevSuggestions.length > 0) {
        setSuggestions(prevSuggestions);
      }
    };

    const handleInputBlur = () => {
      setIsInputFocused((prevFocused) => false);
    };

    inputRef.current?.addEventListener("focus", handleInputFocus);
    inputRef.current?.addEventListener("blur", handleInputBlur);
    return () => {
      inputRef.current?.removeEventListener("focus", handleInputFocus);
      inputRef.current?.removeEventListener("blur", handleInputBlur);
    };
  }, [prevSuggestions]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
      />
      <ul ref={listRef} className="suggestions-list">
        {suggestions.map((item, index) => (
          <li
            key={`${item.label}_${index}`}
            className={index === activeIndex ? "active" : ""}
            onClick={() => handleItemClick(item)}
          >
            <span dangerouslySetInnerHTML={{ __html: item.highlightedLabel }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
