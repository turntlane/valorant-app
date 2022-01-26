import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PlayerSearch from "./Components/PlayerSearch/PlayerSearch";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Home from "./Components/Home/Home";
import Header from "./Components/Navbar/Header";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div>
      <Router>
      <Header />
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/playersearch" component={PlayerSearch} />
          <Route path="/leaderboard" component={Leaderboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

