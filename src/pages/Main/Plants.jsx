import { useContext, useEffect } from "react";

import Button from "react-bootstrap/Button";
import PlantCard from "../../components/Plants/PlantCard";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import PlantContext from "../../context/PlantContext";
import PlantRegister from "../../components/Plants/PlantRegister";

import Box from "@mui/material/Box";
import theme from "../../theme";

const Plants = () => {
  const { sendRequest, plantList } = useContext(PlantContext);

  useEffect(() => {
    sendRequest(0, "get_all_plant");
  }, []);

  useEffect(() => {}, [plantList]);

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        width: "100%",
        overflowY: "auto",
        backgroundColor: "#EEE", // Nền sáng giúp nổi bật
      }}
    >
      {/* Plant Register */}
      <Popup
        trigger={
          <Button className="m-4 mb-0 mt-3" variant="primary">
            Register pot
          </Button>
        }
        modal
      >
        <PlantRegister></PlantRegister>
      </Popup>

      {/* Plant List */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
          gap: "20px",
          padding: "20px",
        }}
      >
        {plantList
          ? plantList.map((plant, index) => (
              <PlantCard key={index} plant={plant} />
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default Plants;
