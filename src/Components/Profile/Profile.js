import React from "react";
import { useSelector } from "react-redux";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import { Link } from "react-router-dom";

function Profile({ setAuth, isAuth, authenticated }) {
  let loadingNoti = useSelector((newState) => newState.userInfo);
  console.log("this is in profile", loadingNoti);

  const profileContent = (
    <div>
      Hey {loadingNoti.firstName}, Update your personal settings for others to
      see!
      <Link to="playerinfo" className="">
        Player Info
      </Link>
    </div>
  );

  return <>{profileContent}</>;
}

export default Profile;
