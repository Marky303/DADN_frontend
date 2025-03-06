import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Tooltip } from 'react-tooltip'

import PlantContext from "../../context/PlantContext";

import PlantSettings from "../PlantSetting/PlantSettings";

const PlantHeader = () => {
    const navigate = useNavigate();
    const { serialID } = useParams();
    const { getPlantName } = useContext(PlantContext);

    return (
        <div className="d-flex align-items-center">
            <h1>Plant Dashboard - {getPlantName(serialID)}</h1>
            <div className="ms-auto d-flex gap-2">
                <Button
                    data-tooltip-id="plantDataTooltip"
                    data-tooltip-content="Detailed data"
                    style={{ borderColor: "#878787", backgroundColor: "#b3b3b3", height: 37 + "px", width: 37 + "px" }}
                    className="p-0 d-flex justify-content-center align-items-center"
                    onClick={() => navigate("/plants/" + serialID + "/data")}
                >
                    <Tooltip id="plantDataTooltip" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
                <PlantSettings/>

            </div>
        </div>
    );
};

export default PlantHeader;
