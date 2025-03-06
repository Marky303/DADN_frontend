import React from "react";

import PlantGraph from "../../components/PlantInfo/PlantGraph";

import PlantTemperature from "../../components/PlantInfo/PlantTemperature";
import PlantLight from "../../components/PlantInfo/PlantLight";
import PlantMoisture from "../../components/PlantInfo/PlantMoisture";
import PlantSoilHumidity from "../../components/PlantInfo/PlantSoilHumidity";
import PlantNotifications from "../../components/PlantInfo/PlantNotifications";
import PlantHeader from "../../components/PlantInfo/PlantHeader";

const PlantInfo = () => {
    return (
        <div style={{ padding: 15 + "px", paddingTop: 3 + "px", backgroundColor: "rgb(237, 237, 237, 0.7)", height: 90.9 + "dvh", overflowY: "scroll" }}>
            <PlantHeader></PlantHeader>

            <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr", /* Chia thành 2 cột: 2 phần thông số - 1 phần Notifications */
                gap: 15 + " px"
            }}>
                {/* Cột trái: Các thông số cây (Plant Parameters) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginRight: 15 + "px" }}>
                    <PlantTemperature />
                    <PlantLight />
                    <PlantSoilHumidity />
                    <PlantMoisture />
                </div>

                {/* Cột phải: Notifications */}
                <PlantNotifications />
            </div>

            {/* Graph nằm hàng dưới, chiếm toàn bộ chiều rộng */}
            <div style={{ marginTop: "20px" }}>
                <PlantGraph />
            </div>
        </div>
    );
};

export default PlantInfo;
