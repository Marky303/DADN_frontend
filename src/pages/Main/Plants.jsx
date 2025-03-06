import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import PlantCard from "../../components/Plants/PlantCard";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import PlantContext from "../../context/PlantContext";
import PlantRegister from "../../components/Plants/PlantRegister";

const Plants = () => {
    const { sendRequest, plantList } = useContext(PlantContext);

    useEffect(() => {
        sendRequest(0, "get_all_plant");
    }, []);

    useEffect(() => { }, [plantList]);

    return (
        <div
            style={{
                height: "90.9vh", // Chiếm toàn bộ chiều cao màn hình
                backgroundColor: "#EEE", // Nền sáng giúp nổi bật
                paddingBottom: "100px", // Tránh bị che khuất ở cuối
            }}
        >
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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
                    gap: "20px",
                    padding: "20px",
                    overflowY: "auto", // Cuộn khi nội dung vượt quá màn hình
                }}
            >
                {plantList
                    ? plantList.map((plant, index) => (
                        <PlantCard key={index} plant={plant} />
                    ))
                    : ""}
            </div>
        </div>
    );
};

export default Plants;
