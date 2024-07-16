import React from "react";
import Autocomplete from "./Autocomplete";
import { AutocompleteItem } from "./types";
import DataProvider from "./DataProvider";

const App: React.FC = () => {
  const apiUrl =
    "http://universities.hipolabs.com/search?country=United+States";

  const onSelect = (item: AutocompleteItem) => {
    console.log(`Selected item: ${item.label}`);
  };

  return (
    <div className="app">
      <h1>AutoComplete Component</h1>
      <DataProvider url={apiUrl}>
        {(data) => (
          <Autocomplete
            data={data.map((university) => ({
              label: university.name,
              highlightedLabel: university.name,
              value: university.name,
            }))}
            onSelect={onSelect}
          />
        )}
      </DataProvider>
    </div>
  );
};

export default App;
