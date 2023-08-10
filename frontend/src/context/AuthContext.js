import { createContext, useEffect, useReducer } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    // user :null basically means when a user opens a web he/she is not logged in
    user: null,
  });
  console.log("AuthContext ", state);
  // to update the authcontext so ass to stay logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("credentials"));

    //this is to check if the user exist on the localstorage and update the authContext so as to maaintain the loging so as to avoid logging out the credentials
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
