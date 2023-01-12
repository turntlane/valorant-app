// export const userInfoAction = (userInfo) => {
//   return (dispatch) => {
//     console.log("user info: ", userInfo);
//     dispatch({
//       type: "GET_USER",
//       action: userInfo,
//     });
//   };
// };

export const GET_USER = "GET_USER";

export const getUser = (firstName, lastName, email) => {
  return {
    type: GET_USER,
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
};
