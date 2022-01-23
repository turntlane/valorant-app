import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PlayerSearch from "./PlayerSearch/PlayerSearch";
import Leaderboard from "./Leaderboard/Leaderboard";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerSearch} />
          <Route path="/playersearch" component={Leaderboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

