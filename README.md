# React Medusa Autocomplete

## Description

The React Medusa Autocomplete is a reusable component designed to streamline autocomplete functionality. It efficiently manages changes and displays a suggestions list, highlighting the matched word within the list. This component is wrapped in a DataProvider, which retrieves and manages information from a specific endpoint, handling errors seamlessly. Additionally, the React Medusa Autocomplete is optimized to work seamlessly with keyboard arrow navigation, providing a smooth user experience.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/GabrielRegato/ReactMedusaAutocomplete.git`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

### Development Server

Run `npm start` to start the development server. Navigate to `http://localhost:3000/` to access the app.

### Build and Deployment

Run `npm run build` to build the application. The command mentioned builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## How to Use

### Basic Usage

To use the Autocomplete component, you'll need to wrap it with the `DataProvider` component, which fetches data from a specified URL.

Example:

```javascript
import React from "react";
import Autocomplete from "./Autocomplete";
import DataProvider from "./DataProvider";

const MyComponent = () => {
  const apiUrl = "https://my-api.com/data"; // Replace with your API URL

  const onSelect = (item: AutocompleteItem) => {
    console.log(`Selected item: ${item.label}`);
  };

  return (
    <DataProvider url={apiUrl}>
      {(data) => (
        <Autocomplete
          data={data.map((item) => ({
            label: item.name,
            highlightedLabel: item.name,
            value: item.name,
          }))}
          onSelect={onSelect}
        />
      )}
    </DataProvider>
  );
};
```

### Props

The Autocomplete component accepts the following props:

- `data`: An array of `AutocompleteItem` objects, where each item has `label`, `highlightedLabel`, and `value` properties.
- `onSelect`: A callback function that is called when an item is selected. It receives the selected `AutocompleteItem` as an argument.

### DataProvider Props

The DataProvider component accepts the following prop:

- `url`: The URL of the API endpoint that returns the data for the Autocomplete component.

### AutocompleteItem Interface

The `AutocompleteItem` interface has the following properties:

- `label`: The display text for the item.
- `highlightedLabel`: The highlighted display text for the item (optional).
- `value`: The value of the item.

By following these steps, you can easily integrate the Autocomplete component into your React application and start providing suggestions to your users!

## Features

### 1\. Autocomplete Component

- A reusable component that manages autocomplete functionality
- Displays a suggestions list and highlights the matched word within the list
- Equipped to work with keyboard arrow navigation
- Handles input changes, filtering data from the endpoint, and updating suggestions
- Handles keyboard events for input field, allowing navigation through suggestions using arrow keys and selection by pressing Enter
- Handles selection of an item from the suggestions list, calling the onSelect callback with the selected item

### 2\. DataProvider Component

- Manages calls to a specific URL, fetching data from an endpoint
- Handles errors and loading states
- Provides a way to render children components with the fetched data

### 3\. Reusable and Customizable

- The Autocomplete component is designed to be reusable and customizable for various use cases
- Can be easily integrated into different projects and applications

### 4\. Keyboard Navigation

- Supports keyboard navigation using arrow keys and Enter key
- Allows users to navigate through suggestions and select an item without using a mouse

### 5\. Error Handling

- Handles errors that occur during data fetching and provides a fallback error message
- Displays a loading indicator while data is being fetched

### 6\. Accessibility

- Follows accessibility guidelines for autocomplete components
- Provides a good user experience for users with disabilities

### 7\. Easy Integration

- Easy to integrate into existing projects and applications
- Can be used as a standalone component or as part of a larger application

## Technologies Used

### Frontend Framework

- React: ^18.3.1

### JavaScript Library

- React DOM: ^18.3.1

### Build Tool

- React Scripts: 5.0.1

### Programming Language

- TypeScript: ^4.9.5

### Linting Tool

- ESLint: (configured via `eslintConfig`)

## Disclaimer

This repository is provided "as is" and without warranty of any kind. Use at your own risk. While we hope this repository helps you get started with building autocomplete functionality into your React applications, you are responsible for modifying and adapting the code to suit your specific needs. You may improve or change the Autocomplete component, DataProvider, and related templates as necessary, but please be aware that we do not guarantee the accuracy, completeness, or reliability of the code.

React Medusa Autocomplete - Gabriel A.R.
