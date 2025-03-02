import { createContext, useState, useEffect, useContext, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import AuthContext from "./UserauthContext";

import notify from "../functions/toastify/notify";
import { current } from "@reduxjs/toolkit";

const PlantContext = createContext();

export default PlantContext;

export const PlantProvider = () => {
  // SETUP
  const navigate = useNavigate();
  let { accessToken, logout } = useContext(AuthContext);

  // VARIABLES
  const firestoreClientRef = useRef(null);

  let [plantList, setPlantList] = useState([]);

  let [currentGraph, setCurrentGraph] = useState("Temperature");

  let [loading, setLoading] = useState(false);

  // FUNCTIONS
  const sendRequest = async (e, requestType) => {
    setLoading(true);
    let result = null;

    try {
      switch (requestType) {
        case "get_all_plant":
          await getAllPlants();
          break;
        default:
          throw new Error("Request type undefined");
      }
    } catch (error) {
      handleError(error);
    }

    setLoading(false);
    return result;
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

  const initializeFirestore = () => {
    if (!firestoreClientRef.current) {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASE_APPID,
      };

      const app = initializeApp(firebaseConfig);
      firestoreClientRef.current = getFirestore(app);
    }
    return firestoreClientRef.current;
  };

  const changeGraph = (graph) => {
    setCurrentGraph(graph);
  }

  const getPlantName = (SerialID) => {
    if (plantList.length != 0)
    { 
      const plant = plantList.find(p => p.SerialID === SerialID);
      return plant.Name;
    }
    return ""
  }

  const getAllPlants = async () => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_GET_PLANTS_ENDPOINT, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response && response.status == 200) {
      console.log(response.data.data)
      setPlantList(response.data.data);
    } else {
      throw e;
    }
  }

  // EXPORT
  const contextData = {
    // Variables
    plantList: plantList,
    currentGraph: currentGraph,

    // Functions
    sendRequest: sendRequest,
    initializeFirestore: initializeFirestore,
    changeGraph: changeGraph,
    getPlantName: getPlantName,
  };

  return (
    <PlantContext.Provider value={contextData}>
      {<Outlet />}
    </PlantContext.Provider>
  );
};
