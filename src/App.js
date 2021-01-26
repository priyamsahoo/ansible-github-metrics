import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Collections from "./components/Collections/Collections";
import { Container } from "reactstrap";
import Developers from "./components/Developers/Developers";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Collections />
          </Route>
          <Route exact path="/developers">
            <Developers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
