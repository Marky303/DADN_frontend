import React from "react";
import { useParams } from "react-router-dom";
import PlantParameter from "../../components/PlantInfo/PlantParameter";
import Graph from "../../components/PlantInfo/Graph";
import Notifications from "../../components/PlantInfo/Notifications";

const PlantInfo = () => {
    const { plantID } = useParams();

    const plantData = {
        temperature: 30,
        light: 80,
        humidity: 55,
        moisture: 75,
        tempHistory: [
            { time: "10:00", value: 28 },
            { time: "10:30", value: 30 },
            { time: "11:00", value: 27 },
            { time: "11:30", value: 29 },
            { time: "12:00", value: 32 },
        ],
        notifications: [
            { time: "10:31 AM", message: "Light level is too high, need to change the position!", type: "alert" },
            { time: "09:50 AM", message: 'Plan "Default" is applied', type: "info" },
            { time: "09:30 AM", message: "Moisture level is too low!", type: "alert" },        
        ],
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#EDEDED", height: "100vh", overflowY: "auto" }}>
            <h1>Plant Details - {plantID}</h1>

            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "2fr 1fr", /* Chia thành 2 cột: 2 phần thông số - 1 phần Notifications */
                gap: "20px" 
            }}>
                {/* Cột trái: Các thông số cây (Plant Parameters) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <PlantParameter label="Temperature" value={plantData.temperature} unit="°C" range="28°C - 32°C" bgColor="#FFA500" />
                    <PlantParameter label="Light Level" value={plantData.light} unit="%" range="70% - 80%" bgColor="#BFD732" />
                    <PlantParameter label="Soil Humidity" value={plantData.humidity} unit="ml" range="50ml - 75ml" bgColor="#D2A679" />
                    <PlantParameter label="Moisture" value={plantData.moisture} unit="%" range="70% - 80%" bgColor="#4A90E2" />
                </div>

                {/* Cột phải: Notifications */}
                <Notifications notifications={plantData.notifications} />
            </div>

            {/* Graph nằm hàng dưới, chiếm toàn bộ chiều rộng */}
            <div style={{ marginTop: "20px" }}>
                <Graph data={plantData.tempHistory} />
            </div>
        </div>
    );
};

export default PlantInfo;
