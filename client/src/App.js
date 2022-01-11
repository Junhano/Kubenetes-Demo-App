import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AssignmentPage from "./Pages/Assignment/Assignment";

const App = () => {
  return (
    <Router>
      <div>
        <div className="App">
          <h1 className="App-title">Welcome to CourseSpace</h1>
          <Link className="title" to="/">
            Assignments
          </Link>
        </div>
        <div>
          <Route exact path="/" component={AssignmentPage} />
        </div>
      </div>
    </Router>
  );
};

export default App;
