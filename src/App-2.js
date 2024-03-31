import React from "react";
import { useEffect } from "react";
import { createBrowserHistory } from "history";
import { useReducer } from "react";

const history = createBrowserHistory();

const Route = ({ path, component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return React.createElement(component);
  } else {
    return null;
  }
};

const Link = ({ to, children }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
);

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    history.listen(() => forceUpdate());
  }, []);

  return (
    <div className="ui text container">
      <h2 className="ui dividing header">Food Lookup</h2>

      <ul>
        <li>
          <Link to="/food">
            <code>/food</code>
          </Link>
        </li>
        <li>
          <Link to="/foodLookup">
            <code>/foodLookup</code>
          </Link>
        </li>
      </ul>

      <hr />

      <Route path="/food" component={Food} />
      <Route path="/foodLookup" component={FoodLookup} />
    </div>
  );
}

const Food = () => (
  <div>
    <h3>Food</h3>
    <p>
      The food lookup.
    </p>
  </div>
);

const FoodLookup = () => (
  <div>
    <h3>Food Lookup</h3>
    <p>
      This is the Food Lookup.
    </p>
  </div>
);

export default App;
