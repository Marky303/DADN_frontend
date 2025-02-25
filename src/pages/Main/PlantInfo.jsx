import React from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PlantInfo = () => {
    const { plantID } = useParams(); // Lấy ID của cây từ URL

    // Dữ liệu mẫu tĩnh, sau này sẽ lấy từ Firestore
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
            { time: "12:00", value: 3200 },
        ],
        notifications: [
            { time: "10:31 AM", message: "Light level is too high, need to change the position!", type: "alert" },
            { time: "09:50 AM", message: 'Plan "Default" is applied', type: "info" },
            { time: "09:30 AM", message: "Moisture level is too low!", type: "alert" },
            { time: "09:00 AM", message: "Temperature is too high!", type: "info" },
            { time: "08:30 AM", message: "Light level is too low!", type: "alert" },
            { time: "08:00 AM", message: "Moisture level is too high!", type: "info" },
            { time: "07:30 AM", message: "Temperature is too low!", type: "alert" },
            { time: "07:00 AM", message: "Light level is too high!", type: "info" },
            { time: "06:30 AM", message: "Moisture level is too low!", type: "info" },
            { time: "06:00 AM", message: "Temperature is too high!", type: "info" },
            { time: "05:30 AM", message: "Light level is too low!", type: "info" },
            { time: "05:00 AM", message: "Moisture level is too high!", type: "alert" },
            { time: "04:30 AM", message: "Temperature is too low!", type: "info" },
            { time: "04:00 AM", message: "Light level is too high!", type: "alert" },
        ],
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#EDEDED", height: "90vh", overflowY: "auto" }}>
            <h1>Plant Details - {plantID}</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Thông tin cây */}
                {[
                    { label: "Temperature", value: `${plantData.temperature}°C`, color: "#FFA500", range: "28°C - 32°C" },
                    { label: "Light Level", value: `${plantData.light}%`, color: "#BFD732", range: "70% - 80%" },
                    { label: "Soil Humidity", value: `${plantData.humidity}ml`, color: "#D2A679", range: "50ml - 75ml" },
                    { label: "Moisture", value: `${plantData.moisture}%`, color: "#4A90E2", range: "70% - 80%" },
                ].map((item, index) => (
                    <div key={index} style={{ backgroundColor: item.color, padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h4 style={{ margin: 0 }}>{item.label}</h4>
                            <small>Desired range: {item.range}</small>
                        </div>
                        <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>{item.value}</p>
                    </div>
                ))}

                {/* Biểu đồ nhiệt độ */}
                <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px" }}>
                    <h4>Temperature History</h4>
                    <ResponsiveContainer width="95%" height={300}>
                        <LineChart data={plantData.tempHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#FF5733" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Thông báo */}
                <div style={{ backgroundColor: "#D3D3D3", padding: "15px", borderRadius: "10px" }}>
                    <h4>Notifications</h4>

                    {/* Hiển thị 2 thông báo gần nhất */}
                    {plantData.notifications.slice(0, 2).map((notif, index) => (
                        <p
                            key={index}
                            style={{
                                backgroundColor: notif.type === "alert" ? "#FF6B6B" : "#AEEEEE",
                                padding: "10px",
                                borderRadius: "5px"
                            }}
                        >
                            {notif.message} <br />
                            <small>{notif.time}</small>
                        </p>
                    ))}

                    {/* Vùng cuộn chứa các thông báo còn lại */}
                    <div style={{ maxHeight: "150px", overflowY: "auto", marginTop: "10px", borderTop: "1px solid gray", paddingTop: "10px" }}>
                        {plantData.notifications.slice(2).map((notif, index) => (
                            <p
                                key={index + 2}
                                style={{
                                    backgroundColor: notif.type === "alert" ? "#FF6B6B" : "#AEEEEE",
                                    padding: "10px",
                                    borderRadius: "5px"
                                }}
                            >
                                {notif.message} <br />
                                <small>{notif.time}</small>
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlantInfo;
