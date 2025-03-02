import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PlantContext from "../../context/PlantContext";

import PlantCard from "../../components/Plants/PlantCard"

const Plants = () => {
    const { sendRequest, plantList } = useContext(PlantContext);

    useEffect(() => {
        sendRequest(0, "get_all_plant");
    }, []);

    useEffect(() => {
    }, [plantList]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
                gap: "20px",
                padding: "20px",
                height: "90.9vh", // Chiếm toàn bộ chiều cao màn hình
                overflowY: "auto", // Cuộn khi nội dung vượt quá màn hình
                backgroundColor: "#EEE", // Nền sáng giúp nổi bật
                paddingBottom: "100px", // Tránh bị che khuất ở cuối
            }}
        >
            {plantList ? plantList.map((plant, index) => (
                <PlantCard key={index} plant={plant}/>
            )) : ""}
        </div>
    );
};

export default Plants;
