import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PlayerSearch from "./Components/PlayerSearch/PlayerSearch";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Home from "./Components/Home/Home";
import Header from "./Components/Navbar/Header";
import Bundles from "./Components/Bundles/Bundles";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo";
import ShowPlayerInfo from "./Components/PlayerInfo/ShowPlayerInfo";
import Register from "./Components/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/playersearch" component={PlayerSearch} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/bundles" component={Bundles} />
          <Route path="/playerinfo" component={PlayerInfo} />
          <Route path="/showplayerinfo" component={ShowPlayerInfo} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
