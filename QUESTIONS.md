### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A Component will re-render when its parent component re-renders or when its state/props change.
A PureComponent re-renders only when its state/props change.

Pure components are memoised under the hood so can in fact negatively affect the performance of your app.
Optimisation should only used if a problem exists.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

shouldComponentUpdate can be used to tell React a component update can be skipped. This can be dangerous as it could accidentally block context propogation.

### 3. Describe 3 ways to pass information from a component to its PARENT

Use a callback function:

```
function Parent() {
  const [dataFromChild, setDataFromChild] = useState("");

  return (
    <>
      <h1>Data from Child: {dataFromChild}</h1>
      <Child setDataFromChild={setDataFromChild} />
    </>
  );
}
```

```
function Child({ setDataFromChild }) {
  return (
      <input type="text" value={data} onChange={(e) => setDataFromChild(e.target.value)} />
  );
}
```

Use the context api:

```
interface ContextValue {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const myContext = createContext<ContextValue | undefined>(undefined);

function Parent() {
  const [value, setValue] = useState("Start value");

  return (
    <section>
      <myContext.Provider value={{ value, setValue }}>
        <Child />
      </myContext.Provider>
    </section>
  );
}
```

```
const Child = () => {
  const context = useContext(myContext);

  return (
    <>
      <div>{context?.value}</div>

      <button onClick={() => context?.setValue("Updated value")}>
        Update parent
      </button>
    </>
  );
};
```

Use a state management library such as Redux

1. Create a reducer to hold the state
2. Dispatch an update from the child component
3. Subscribe to the change in the parent component

### 4. Give 2 ways to prevent components from re-rendering

Replace useState hook with useRef hook

useState

```
function inputWithState() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      type={type}
    />
  );
}
```

useRef (when the input is updated it will not re-render)

```
function inputWithRef() {
  const inputEl = useRef(null);

  return (
    <input ref={inputEl} type="text" />
  );
}
```

useCallback to memoize a function. Clicking the button will not re-render the component

```
function Item() {
  const onClick = useCallback(event => {
    console.log('Clicked Item : ', event.currentTarget);
  }, []);

  return (
    <button onClick={onClick}></button>
  );
}
```

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment allows you to group elements together where you need a single element without using a dom element such as a div.

```
<>
  <Child />
  <OtherChild />
</>
```

TODO: when can a fragment break code?

### 6. Give 3 examples of the HOC pattern.

1. We can use a HOC to protect a component from unauthorized access

```
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => {
  return class extends Component {
    state = {
      authenticated: false,
    };

    componentDidMount() {
      // Check if user is authenticated
      const authenticated = localStorage.getItem('authenticated');
      if (authenticated) {
        this.setState({ authenticated: true });
      }
    }

    render() {
      const { authenticated } = this.state;

      if (!authenticated) {
        return <Redirect to="/login" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
```

```
import React from 'react';
import withAuth from './withAuth';

const PrivateComponent = () => {
  return <div>This is a private component.</div>;
};

export default withAuth(PrivateComponent);
```

2. We can use a HOC to add logging to a component

```
const withLogger = (WrappedComponent) => {
  return class ClickLogger extends React.Component {
    constructor(props) {
      super(props);
    }
    onClick = (e) => {
      console.log(e)
    }
    render() {
      return (
        <div>
          <WrappedComponent onClick={this.onClick} />
        </div>
      );
    }
  }
}
```

```
const LoggableBaseComponent = withLogger(BaseComponent);
```


3. We can use a HOC to utilise 3rd party libraries such as react-redux

```
connect(mapStateToProps, mapDispatchToProps)(UserPage)
```

### 7. What's the difference in handling exceptions in promises, callbacks and async…await?

In a promise we use the catch block to handle errors:

```
getData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

In a callback we use the err object to handle errors

```
const fs = require('fs');

fs.readFile('/home/Kedar/node.txt', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});
```

In async/await we use try catch blocks

```
async function getData() {
  try {
    const data = await callApi();
  } catch (error) {
    console.log(error);
  }
}
```

### 8. How many arguments does setState take and why is it async.

setState can take 2 arguments with the second arg being optional

The first argument is the updated state:

```
this.setState({quantity: 2})
```

The second argument that can optionally be passed to setState is a callback function which gets called immediately after the setState is completed. If you want to perform certain actions on the updated value of the state then you must specify those actions in this second argument.

setState is asynchronous which means it will be queued to update but may not happen immediately.

### 9. List the steps needed to migrate a Class to FunctionComponent.

1. Change the class to a function
2. Remove the render method
3. Convert all methods to functions
4. Remove references to this
5. Remove constructor
6. Remove event handler bindings
7. Replace this.setState
8. useEffect for state update side effects
8. useEffect for state update side effects

### 10. List a few ways styles can be used with components.

1. Inline styling

```
<h1 style={{color: "red"}}>Hello Style!</h1>
```

2. JavaScript Object

```
  const mystyle = {
    color: "white",
    backgroundColor: "red",
    padding: "10px",
  };

  return (
    <div>
      <h1 style={mystyle}>Hello Style!</h1>
      <p>Add a little style!</p>
    </div>
  );
```

3. CSS Stylesheet

```
import './Component.css'
<span className="menu">Menu</span>
```

4. CSS Modules

```
import styles from './Component.module.css';

<span className={styles.menu}>Menu</span>
```

### 11. How to render an HTML string coming from the server.

dangerouslySetInnerHTML is React's replacement for using innerHTML in the browser DOM.

```
<div dangerouslySetInnerHTML={{__html: someValueFromTheServer}} />
```





