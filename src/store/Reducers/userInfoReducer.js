import { GET_USER } from "../actions/userInfoAction";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
      };
    default:
      return state;
  }
};

// const userInfoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "GET_USER":
//       console.log(action);
//       return state;
//     default:
//       return state;
//   }
// };

export default userInfoReducer;
