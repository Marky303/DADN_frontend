import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Tooltip } from 'react-tooltip'

import PlantContext from "../../context/PlantContext";

const PlantHeader = () => {
    const navigate = useNavigate();
    const { serialID } = useParams();
    const { getPlantName } = useContext(PlantContext);

    return (
        <div className="d-flex align-items-center">
            <h1>Plant Data - {getPlantName(serialID)}</h1>
            <div className="ms-auto d-flex gap-2">
                <Button
                    data-tooltip-id="plantDashboardTooltip"
                    data-tooltip-content="Dashboard"
                    style={{ borderColor: "#878787", backgroundColor: "#b3b3b3", height: 37 + "px", width: 37 + "px" }}
                    className="p-0 d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/plants/" + serialID)}
                >
                    <Tooltip id="plantDashboardTooltip" />
                    <i className="fa-solid fa-chart-simple"></i>
                </Button>
                <Button
                    data-tooltip-id="plantSettingsTooltip"
                    data-tooltip-content="Settings"
                    style={{ borderColor: "#878787", backgroundColor: "#b3b3b3", height: 37 + "px", width: 37 + "px" }}
                    className="p-0 d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/plants/" + serialID + "/settings")}
                >
                    <Tooltip id="plantSettingsTooltip" />
                    <i className="fa-solid fa-bars"></i>
                </Button>

            </div>
        </div>
    );
};

export default PlantHeader;
