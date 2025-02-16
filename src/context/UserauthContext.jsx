import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import notify from "../functions/toastify/notify";

const UserauthContext = createContext();

export default UserauthContext;

export const UserauthProvider = () => {
  // SETUP
  const navigate = useNavigate();

  // VARIABLES
  let [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );

  let [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null
  );

  let [sessionExpireTime, setSessionExpireTime] = useState(() =>
    localStorage.getItem("sessionExpireTime")
      ? localStorage.getItem("sessionExpireTime")
      : null
  );

  let [loading, setLoading] = useState(false);

  // FUNCTIONS
  const sendRequest = async (e, requestType) => {
    setLoading(true);

    try {
      switch (requestType) {
        case "login":
          await login(e);
          break;
        case "signup":
          await signup(e);
          break;
        case "activate":
          await activate(e);
          break;
        default:
          throw "Request type undefined";
      }
    } catch (error) {
      handleError(error);
    }

    setLoading(false);
  };

  const handleError = (error) => {
    if (error.response) {
      for (var prop in error.response.data) {
        if (Object.prototype.hasOwnProperty.call(error.response.data, prop)) {
          // error.response.data have multiple types of properties
          // "detail" property is a string containing a message
          // other properties are a list of strings
          switch (prop) {
            case "detail":
              notify("error", error.response.data[prop]);
              break;
            default:
              for (const message of error.response.data[prop])
                notify("error", prop + ": " + message);
          }
        }
      }
    } else {
      notify("error", "Something happened");
      console.log(error);
    }
  };

  const login = async (e) => {
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_LOGIN_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 200) {
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      notify("success", "Welcome back!");

      if (!e.target.rememberMe.checked) {
        setSessionExpireTime(
          Date.now() + Number(import.meta.env.VITE_SESSION_TIME)
        );
        localStorage.setItem(
          "sessionExpireTime",
          Date.now() + Number(import.meta.env.VITE_SESSION_TIME)
        );
      }

      navigate("/dashboard");
    } else {
      throw e;
    }
  };

  const signup = async (e) => {
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      re_password: e.target.re_password.value,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_SIGNUP_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 201) {
      notify(
        "success",
        "Verification email has been sent, please check your email"
      );
      navigate("/login");
    } else {
      throw e;
    }
  };

  const activate = async (e) => {
    const body = {
      uid: e.uid,
      token: e.token,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_ACTIVATE_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 204) {
      notify("default", "Navigating to login...");
    } else {
      throw e;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionExpireTime");

    setAccessToken(null);
    setRefreshToken(null);
    setSessionExpireTime(null);

    navigate("/");
    notify("warning", "Logged out!");
  };

  // EXPORT
  const contextData = {
    // Variables
    accessToken: accessToken,
    loading: loading,

    // Functions
    sendRequest: sendRequest,
    logout: logout,
  };

  useEffect(() => {
    if (sessionExpireTime && Date.now() >= sessionExpireTime) logout();
  }, []);

  return (
    <UserauthContext.Provider value={contextData}>
      {<Outlet />}
    </UserauthContext.Provider>
  );
};
