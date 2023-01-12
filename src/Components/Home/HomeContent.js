import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions/userInfoAction";
import Login from "../Login/Login";

function HomeContent({ setAuth }) {
  const dispatch = useDispatch();
  const [name, setName] = useState({});

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const jsonResponse = await response.json();
      dispatch(
        getUser(
          jsonResponse.first_name,
          jsonResponse.last_name,
          jsonResponse.email
        )
      );
      setName(jsonResponse);
      console.log("this is the home content: ", jsonResponse);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = (e) => {
    // e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    return <Login />;
  };

  useEffect(() => {
    getName();
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <div style={{ zIndex: "500" }} className="wrapper w-100">
        <div className="body">
          <div className="home-header-text">
            <h1 className="home-title" data-aos={"fade-up"}>
              Welcome to {<br></br>}
              White Rifle
            </h1>
            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 mr-5 float-right"
              data-aos={"zoom-in"}
              data-aos-delay={"150"}
            >
              <img
                src="https://s3-us-west-2.amazonaws.com/fireshare-prd/projects/caWiteo4FxUhI8tTm8CnHNiP5QdaspkBzmgCBGvR.png"
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
          <p className="text-white home-content" data-aos={"fade-up"}>
            An all in one game tracker.
            {<br></br>} Up to date leaderboards, player profiles, player stats,
            and more!
          </p>
          {/* {name.first_name}
          <button onClick={(e) => handleLogout(e)}>Logout</button> */}
          <Link to="playersearch" className="btn btn-outline-light home-button">
            Search Player
          </Link>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}

export default HomeContent;
