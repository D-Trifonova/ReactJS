import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate as Redirect,
} from "react-router-dom";

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
        <li>
          <Link to="/calories">
            <code>/calories</code>
          </Link>
        </li>
      </ul>

      <hr />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/food/again" element={<FoodAgain />} />
        <Route path="/foodLookup" element={<FoodLookup />} />
        <Route path="/calories" element={<Calorie />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
);

const Home = () => <h3>Welcome! Select a food above.</h3>;

function NotFound() {
  let location = useLocation();

  return (
    <div className="ui inverted red segment">
      <h3>
        Error! No matches for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const FoodAgain = () => (
  <div>
    <h3>Food — Again!</h3>
    <p>Also known as "The Food... Lookup... Again!"</p>
  </div>
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

function Calorie() {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(function (prevCount) {
        return (prevCount -= 1);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h3>Calorie</h3>
      <p>Calories are nothing [sic] here ...</p>
      <p>Redirecting in {counter}...</p>
      {counter < 1 ? <Redirect to="/" /> : null}
    </div>
  );
}

export default App;
