import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Collections from "./components/Collections";
import { Container } from "reactstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container>
          <Collections />
        </Container>
      </div>
    </Router>
  );
}

export default App;
