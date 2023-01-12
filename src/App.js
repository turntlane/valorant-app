import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import PlayerSearch from "./Components/PlayerSearch/PlayerSearch";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Home from "./Components/Home/Home";
import Header from "./Components/Navbar/Header";
import Bundles from "./Components/Bundles/Bundles";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo";
import ShowPlayerInfo from "./Components/PlayerInfo/ShowPlayerInfo";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store/actions";
import { getUser } from "./store/actions/userInfoAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { userInfoAction } = bindActionCreators(actionCreators, dispatch);

  console.log("redux state: ", state.userInfo);

  const setAuth = (bool) => {
    setAuthenticated(bool);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verified", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const jsonResponse = await response.json();
      jsonResponse === true ? setAuthenticated(true) : setAuthenticated(false);
      console.log("this is in app.js", jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(authenticated);
    isAuth();
  }, [authenticated]);

  return (
    <div>
      <Router>
        <Header
          setAuth={setAuth}
          isAuth={isAuth}
          authenticated={authenticated}
        />
        <Switch>
          <Route
            path="/login"
            render={(props) =>
              !authenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/register"
            render={(props) =>
              !authenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} setAuth={setAuth} />}
          />
          <Route
            exact
            path="/playersearch"
            render={(props) => <PlayerSearch {...props} />}
          />
          <Route
            path="/leaderboard"
            render={(props) => <Leaderboard {...props} />}
          />
          <Route path="/bundles" render={(props) => <Bundles {...props} />} />
          <Route
            path="/playerinfo"
            render={(props) => <PlayerInfo {...props} />}
          />
          <Route
            path="/showplayerinfo"
            render={(props) => <ShowPlayerInfo {...props} />}
          />
          <Route path="/profile" render={(props) => <Profile {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
