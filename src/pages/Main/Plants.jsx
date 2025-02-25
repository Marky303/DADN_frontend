import React from "react";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ name, image, temp, humid, light, moisture }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/plants/${name.toLowerCase().replace(/ /g, "-")}`);
    };

    return (
        <div 
            onClick={handleClick} 
            style={{
                border: "5px solid", 
                padding: "10px", 
                borderRadius: "10px", 
                textAlign: "center", 
                width: "200px",
                backgroundColor: "#8B5A2B",
                cursor: "pointer",
                maxHeight: "350px",
            }}
        >
            <h4 style={{ color: "white" }}>{name}</h4>
            <img src={image} alt={name} style={{ width: "100%", height: "auto", maxHeight: "120px" }} />
            <p style={{ color: "white", paddingTop: "10px" }}>Temp: {temp}°C</p>
            <p style={{ color: "white" }}>Humid: {humid}ml</p>
            <p style={{ color: "white" }}>Light: {light}%</p>
            <p style={{ color: "white" }}>Moisture: {moisture}%</p>
        </div>
    );
};

const Plants = () => {
    const plantsData = [
        { name: "Plant 1", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 2", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 3", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 4", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 5", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 6", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
        { name: "Plant 7", image: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-hand-drawn-cartoon-tree-green-png-image_4679822.jpg", temp: 30, humid: 100, light: 95, moisture: 80 },
    ];

    return (
        <div 
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
                gap: "20px",
                padding: "20px",
                height: "100vh", // Chiếm toàn bộ chiều cao màn hình
                overflowY: "auto", // Cuộn khi nội dung vượt quá màn hình
                border: "2px solid gray",
                borderRadius: "10px",
                backgroundColor: "#EEE", // Nền sáng giúp nổi bật
                paddingBottom: "100px", // Tránh bị che khuất ở cuối
            }}
        >
            {plantsData.map((plant, index) => (
                <PlantCard 
                    key={index} 
                    name={plant.name} 
                    image={plant.image} 
                    temp={plant.temp}
                    humid={plant.humid} 
                    light={plant.light} 
                    moisture={plant.moisture}
                />
            ))}
        </div>
    );
};

export default Plants;
