import { useRef } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const PlantCard = ({plant}) => {
    const ref = useRef(null);
    const navigate = useNavigate();

    const hoverStyles = {
        transform: "scale(1.01)",
        boxShadow: "0px 4px 15px rgba(52, 152, 219, 0.5)",
        outline: "2px solid #3498db",
        cursor: "pointer",
    };

    const clickStyles = {
        transform: "scale(0.96)",
        boxShadow: "0px 4px 20px rgba(52, 152, 219, 0.8)",
        outline: "2px solid #3498db",
        cursor: "pointer",
    };

    const resetStyles = {
        transform: "scale(1)",
        boxShadow: "none",
        outline: "none",
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
            style={{ width: 200 + "px", maxHeight: 300 + "px", cursor: "pointer" }}
        >
            <Card.Img
                style={{ width: 200 + "px", maxHeight: 200 + "px" }}
                variant="top"
                src="https://img.freepik.com/premium-vector/vector-art-small-plant-white-background_1266257-12018.jpg?semt=ais_hybrid"
            />
            <Card.Body>
                <Card.Title>{plant.Name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default PlantCard;
