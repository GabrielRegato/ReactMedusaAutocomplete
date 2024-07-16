# Questions

### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

In React Component and PureComponent are 2 different type of components, the difference between them are how they handle the state changes and re rendering.

Component: It's a component that will re-render whenever its props ot state change. This means that doesn't matter if the props or states don't change the component still re-rendering, this can caue potential re-rendering issues and may affect the performance.

PureComponent: It's similar as Component but this PureComponent won't re-render is the props or states don't change, and this is happening because the PureComponent implements shouldComponentUpdate.

#### Component Example

```javascript
class ExampleList extends Component {
  render() {
    return (
      <ul>
        {this.props.exampleItems.map((item, key) => (
          <ExampleItem key={key} item={item} />
        ))}
      </ul>
    );
  }
}

class ExampleItem extends Component {
  render() {
    return <li>{this.props.item.name}</li>;
  }
}
```

The problem with this implementation is that whenever the props haven't change we are going have re-renders, even if the "exampleItems" array hasn't actually changed. This can lead to unnecessary re-renders of the ExampleItem component.

#### PureComponent Example

```javascript
class ExampleItem extends PureComponent {
  render() {
    return <li>{this.props.item.name}</li>;
  }
}
```

With this new implementation using PureComponent instead of Component, React only re-render it if its props have actually changed. This ensures that the component only re-renders when necessary, improving performance.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

If we use Context with shouldComponentUpdate can be dangerous based on how they interact with each other.

Context is a way to share data between components without passing props down manually. It means that when the context value changes, React will re-render all the components that are subscribed to that context.

ShouldComponentUpdate is a method that allows us to control whether a component should re-render when its props or state change.

The problem starts if we use Context with a component that has a custom shouldComponentUpdate method. We could prevent the component from re-rendering when the context value changes. This can lead to unexpected behavior, such as the component not updating when the context changes, or not reflecting the latest context value.

### 3. Describe 3 ways to pass information from a component to its PARENT.

To pass information from a Child Component to Parent Component we have several options, next I'm going to list 3 ways.

1.- Callback Functions: The parent component can pass a function as a prop to the child component, and the child component can call that function to pass data back to the parent.

## Example:

```javascript
// ParentComponent.jsx
import React from "react";

const ParentComponent = () => {
  const handleData = (data) => {
    console.log(`Received data from child: ${data}`);
  };

  return <ChildComponent onHandleData={handleData} />;
};

// ChildComponent.jsx
import React from "react";

const ChildComponent = ({ onSendData }) => {
  const sendDataToParent = () => {
    const data = "Data from child!";
    onHandleData(data);
  };

  return <button onClick={sendDataToParent}>Send data to parent</button>;
};
```

2.- Using State Management Libraries like Redux: State Management libraries provide a centralized store for application state, which can be accessed by any component in the application.

### Example

```javascript
// ChildComponent.jsx
import React from "react";

const ChildComponent = ({ dispatch }) => {
  const sendDataToParent = () => {
    const data = "Data from child!";
    dispatch({ type: "SEND_DATA", data });
  };

  return <button onClick={sendDataToParent}>Send data to parent</button>;
};

// ParentComponent.jsx
import React from "react";
import { useSelector } from "react-redux";

const ParentComponent = () => {
  const data = useSelector((state) => state.data);

  return (
    <div>
      <ChildComponent />
      <p>Data from child: {data}</p>
    </div>
  );
};

// Redux store
const store = createStore(reducer, initialState);
```

3.- Using the parent's state as a prop: Using the parent's state as a prop will help us to store information inside of ParentComponent's state, calling the state inside of ChildComponent.

### Example

```javascript
// ParentComponent.jsx
import React, { useState } from "react";

const ParentComponent = () => {
  const [data, setData] = useState("");
  return <ChildComponent setData={setData} />;
};

// ChildComponent.jsx
import React from "react";

const ChildComponent = ({ setData }) => {
  const sendDataToParent = () => {
    const data = "Data from child!";
    setData(data);
  };

  return <button onClick={sendDataToParent}>Send data to parent</button>;
};
```

### 4. Give 2 ways to prevent components from re-rendering.

To prevent re-rendering in the components we have several ways to achive it.

- Implementing shouldComponentUpdate: As I mentioned before ShouldComponentUpdate is a method that allows us to control whether a component should re-render when its props or state change.

- Implementing PureComponent: As I mentioned before PureComponent won't re-render is the props or states don't change, and this is happening because the PureComponent implements shouldComponentUpdate

### 5. What is a fragment and why do we need it ? Give an example where it might break my app.

Fragment: Its a special type of component that allows us to group multiple elements together without adding an extra DOM node. And we need it as mention to group elements specially if we don't want to add extra tags like <div></div>, because sometimes we have styles defined and adding extra tags may affects.

Example:

```javascript
import React from 'react';

const ExampleList = () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  return (
    <ul>
      {items.map((item) => (
        <key={item.id}> // This is the Fragment part adding a key
          <li>{item.name}</li>
        </key>
      ))}
    </ul>
  );
}
```

In the example given we are implementing Fragment (<> </>) to group the list of items, but we need to add a unique key for each list, this will cause a error because a Fragment is not a valid key.

### 6. Give 3 examples of the HOC pattern.

First of all it's important to definie what is a HOC, HOC (Higher-Order Component) is a function that takes a component as an argument and returns a new component with additional props or behavior.

#### Example 1:

```javascript
// ExampleComponent.js
import React from 'react';
import withLoading from './withLoading';

const ExampleComponent = ({ data }) => {
  return <div>Data: {data}</div>;
};

export default withLoading(ExampleComponent);

// withLoading.js
import React from 'react';

const withLoading = (WrappedComponent) => {
  return function EnhancedComponent({ props, ...rest }) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} {...rest} />;
  };
};

export default withLoading;

```

In this example, the HOC withLoading wraps the ExampleComponent component and adds a loading indicator when the isLoading prop is true.

#### Example 2:

```javascript
// ExampleComponent.js
import React from 'react';
import withTheme from './withTheme';

const ExampleComponent = ({ theme }) => {
  return <div style={{ backgroundColor: theme.primaryColor }}>Using HOC</div>;
};

export default withTheme(ExampleComponent);

// withTheme.js
import React from 'react';
import { theme } from './theme';

const withTheme = (WrappedComponent) => {
  return function EnhancedComponent({ props, ...rest }) {
    return <WrappedComponent {...props} theme={theme} {...rest} />;
  };
};

export default withTheme;
```

In this example, the HOC withTheme wraps the ExampleComponent component and injects the theme object as a prop, with this we are allowing the component to access the theme object and customize its appearance, which is really helpful if we want to implement theme change like lightTheme or DarkTheme.

#### Example 3:

```javascript
// ExampleComponent.js
import React from 'react';
import withAuthentication from './withAuthentication';

const ExampleComponent = () => {
  return <div>Authentication feature</div>;
};

export default withAuthentication(ExampleComponent);

// withAuthentication.js
import React from 'react';
import { authenticate } from './auth';

const withAuthentication = (WrappedComponent) => {
  return function EnhancedComponent({ props, ...rest }) {
    if (!authenticate()) {
      return <div>Access denied!!! Only logged users</div>;
    }
    return <WrappedComponent {...props} {...rest} />;
  };
};

export default withAuthentication;
```

In this example, the HOC withAuthentication wraps the ExampleComponent component and checks if the user is authenticated before rendering the component.

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

Talking about handling exceptions, I'm going to describe each one and the differences.

- Callbacks: In callbacks, we handle exceptions using try-catch blocks within the callback function. If an error occurs, the callback function is called with an error object as its first argument.

- Promises: In promises, we handle exceptions using .catch() blocks. When a promise is rejected, the .catch() block is called with the error object as its argument.

- Async/Await: In Async/Await we handle exceptions using ry-catch blocks around the await expression. If an error occurs, the await expression throws an exception, which is then caught by the catch block

#### Differences

- Callbacks: Exception handling is done within the callback function using try-catch blocks.

- Promises: Exception handling is done using .catch() blocks.

- Async/Await: Exception handling is done using try-catch blocks around the await expression.

### 8. How many arguments does setState take and why is it async.

setState takes one or two arguments based on the requirements.

The first argument will be the update, this can be an object, array, string, number or function, but its improtant to mention that after React 17 we can only pass object with key-value.

The second argument accepts a callback function that will execute after the update and when the component re-renders.

setState is async because we can't access to immediately to the state, because takes some time the update and the component will be re-rendered.

### 9. List the steps needed to migrate a Class to Function Component.

To migrate a Class Component to a Functional Component we need to follow some steps to make sure that everything will be correct, after the steps I'm going to add an example of a Class Component and the changes to a Functional Component.

- Remove the extends React.Component syntax, usually the Class Component extends from React.Component,but in Functional Components we don't need it.

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  // All the logic inside
}
```

#### Functional Component

```javascript
const ExampleComponent = () => {
  // All the logic inside
};
```

- Remove render() method: In Class Components we need to declare render() to return the JSX but in a Functional Component just we need to return directly the JSX

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  render() {
    return <div>Return of Class Component</div>;
  }
}
```

#### Functional Component

```javascript
const ExampleComponent = () => {
  return <div>Return of Class Component</div>;
};
```

- Remove constructor: In a Class Component we need to define a constructor if we want to work with states and props, in a Functional Component we don't need it.

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Return of Class Component</div>;
  }
}
```

#### Functional Component

```javascript
const ExampleComponent = (props) => {
  return <div>Return of Class Component</div>;
};
```

- Replace this.state with useState Hook: In Class Component to set the states we need to use this.state, but in Functional Components we are going to use the hook useState()

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div>
        <div>Counter: {this.state.counter}</div>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Increment
        </button>
      </div>
    );
  }
}
```

#### Functional Component

```javascript
import {useState} from "react";
const ExampleComponent = () => {
   const [counter, setCounter] = useState(0);
   return (
     <div>
       <div>Counter: {counter}</div>
       <button onClick={() => setCounter((counter) => counter + 1 ) }>
         Increment
       </button>
     </div>
      );
   }
}
```

- Replace this.props with function component props: In a Class Component we can access to the props with this.props but in a Functional Component we can access only as an argument

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div>
        <div>Welcome {this.props.name} to Counter System</div>
        <div>Counter: {this.state.counter}</div>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Increment
        </button>
      </div>
    );
  }
}
```

#### Functional Component

```javascript
import {useState} from "react";
const ExampleComponent = ({name}) => {
   const [counter, setCounter] = useState(0);
   return (
     <div>
       <div>Welcome {name} to Counter System</div>
       <div>Counter: {counter}</div>
       <button onClick={() => setCounter((counter) => counter + 1 ) }>
         Increment
       </button>
     </div>
      );
   }
}
```

- Remove lifecycle methods: In a Class Component we use lifecycle methods like componentDidMount(), componentWillUnmount() to perform the changes in the Component, but in Functional Components we can achive that functionality with useEffect hook.

#### Class Component

```javascript
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    console.log("Application Mounted");
  }

  componentWillUnmount() {
    console.log("Application Unmounted");
  }

  render() {
    return (
      <div>
        <div>Welcome {this.props.name} to Counter System</div>
        <div>Counter: {this.state.counter}</div>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Increment
        </button>
      </div>
    );
  }
}
```

#### Functional Component

```javascript
import {useState, useEffect} from "react";
const ExampleComponent = ({name}) => {
  useEffect(() => {
    console.log('Application Mounted');
    return () => {
      console.log('Application Unmounted');
    };
  }, []);
   const [counter, setCounter] = useState(0);
   return (
     <div>
       <div>Welcome {name} to Counter System</div>
       <div>Counter: {counter}</div>
       <button onClick={() => setCounter((counter) => counter + 1 ) }>
         Increment
       </button>
     </div>
      );
   }
}
```

### 10. List a few ways styles can be used with components.

To add styles to components in React we have several ways

- Inline Styles: Using style attribute to add styles directly to a component.
- Classes: We can add classes directly to a component using the attribute className.
- CSS-in-JS Libraries: We can use CSS-in-JS libraries like Styled Components to add styles to a component. In fact Material UI latest version is using this kind of libraries in the latest version.

### 11. How to render an HTML string coming from the server.

In React, we can render an HTML string coming from the server using the dangerouslySetInnerHTML attribute. This attribute is a property on the div element that allows us to set the HTML content of the element directly. In the Autocomplete component I'm using that attribute to show the suggestions list.

```javascript
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
```
