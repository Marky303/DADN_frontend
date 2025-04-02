import { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import PlantCard from "../../components/Plants/PlantCard";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import PlantContext from "../../context/PlantContext";
import PlantRegister from "../../components/Plants/PlantRegister";

import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField'
import theme from "../../theme";

const Plants = () => {
  const { sendRequest, plantList } = useContext(PlantContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPlants, setFilteredPlants] = useState([]); // State for filtered plants

  useEffect(() => {
    sendRequest(0, "get_all_plant");
  }, []);

  useEffect(() => {
    // Filter plants based on search term (by Serial ID or Name)
    if (searchTerm) {
      setFilteredPlants(
        plantList.filter(
          (plant) =>
            plant.SerialID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.Name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPlants(plantList);
    }
  }, [searchTerm, plantList]);

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        width: "100%",
        overflowY: "auto",
        backgroundColor: "background.main",
      }}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.main",
        p: 3
      }}>
        {/* Plant Register */}
        <Popup
          trigger={
            <Button variant="contained" sx={{ color: "white" }}>
              Register
            </Button>
          }
          modal
        >
          <PlantRegister></PlantRegister>
        </Popup>

        {/* Search */}
        <TextField
          sx={{
            minWidth: "250px",
          }}
          id="outlined-search"
          label="Search by Serial ID or Name"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </Box>

      {/* Plant List */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredPlants && filteredPlants.length > 0
          ? filteredPlants.map((plant, index) => (
              <PlantCard key={index} plant={plant} searchTerm={searchTerm} />
            ))
          : "No plants found"}
      </Box>
    </Box>
  );
};

export default Plants;
