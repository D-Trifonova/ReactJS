import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { createContext } from "react";
import { useContext } from "react";

const Route = ({ path, component }) => {
  const router = useContext(RouterContext);
  const pathname = router.location.pathname;
  if (pathname.match(path)) {
    return React.createElement(component);
  } else {
    return null;
  }
};

function Link({ to, children }) {
  const router = useContext(RouterContext);
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        router.history.push(to);
      }}
      href={to}
    >
      {children}
    </a>
  );
}

const RouterContext = createContext({
  history: createBrowserHistory(),
  location: window.location,
});

function Router(props) {
  const router = useContext(RouterContext);
  const [key, setKey] = useState(0);

  useEffect(() => {
    router.history.listen(() => setKey((k) => k + 1));
  }, []);

  return <div key={key}>{props.children}</div>;
}

const App = () => (
  <Router>
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
  </Router>
);

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
