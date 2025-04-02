import { useRef } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const PlantCard = ({ plant, searchTerm }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const hoverStyles = {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 15px rgba(52, 152, 219, 0.5)",
    outline: "3px solid ",
    cursor: "pointer",
  };

  const clickStyles = {
    transform: "scale(0.96)",
    boxShadow: "0px 4px 20px rgba(52, 152, 219, 0.8)",
    outline: "2px solid ",
    cursor: "pointer",
  };

  const resetStyles = {
    transform: "scale(1)",
    boxShadow: "none",
    outline: "none",
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Card
      ref={ref}
      onMouseEnter={() => {
        Object.assign(ref.current.style, hoverStyles);
      }}
      onMouseLeave={() => {
        Object.assign(ref.current.style, resetStyles);
      }}
      onMouseDown={() => {
        Object.assign(ref.current.style, clickStyles);
      }}
      onMouseUp={() => {
        Object.assign(ref.current.style, hoverStyles);
      }}
      onClick={() => {
        navigate("/plants/" + plant.SerialID);
      }}
      style={{ width: 200 + "px", maxHeight: 400 + "px", cursor: "pointer" }}
    >
      <Card.Img
        style={{ width: 200 + "px", maxHeight: 200 + "px" }}
        variant="top"
        src="https://img.freepik.com/premium-vector/vector-art-small-plant-white-background_1266257-12018.jpg?semt=ais_hybrid"
      />
      <Card.Body>
        <Card.Title>{highlightText(plant.Name, searchTerm)}</Card.Title>
        <Card.Text>
          <Typography variant="body2">
            Serial ID: {highlightText(plant.SerialID, searchTerm)}
          </Typography>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

PlantCard.propTypes = {
  plant: PropTypes.shape({
    SerialID: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Location: PropTypes.string,
  }).isRequired,
  searchTerm: PropTypes.string, // Add prop type for searchTerm
};

export default PlantCard;
