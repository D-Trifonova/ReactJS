import React from "react";

const Route = ({ path, component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return React.createElement(component);
  } else {
    return null;
  }
};

function App() {
  return (
    <div className="ui text container">
      <h2 className="ui dividing header">Food Lookup</h2>

      <ul>
        <li>
          <a href="/food">
            <code>/food</code>
          </a>
        </li>
        <li>
          <a href="/foodLookup">
            <code>/foodLookup</code>
          </a>
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
