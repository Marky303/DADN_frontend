import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";

import PlantContext from "../../context/PlantContext";

const PlanListElement = ({ planData }) => {
    const navigate = useNavigate();
    const { sendRequest, loading } = useContext(PlantContext);
    const ref = useRef();
    const data = planData ? JSON.parse(planData.JSON) : {};
    const planID = planData ? planData.id : null;

    const handleDelete = () => {
        sendRequest(planID, "delete_plan");
    }

    const handleCopy = () => {
        sendRequest(data, "copy_plan");
    }

    const handleEdit = () => {
        navigate(`/plans/editplan/${planID}`, { state: { planData } });
    }

    const hoverStyles = {
        transform: "scale(1.005)",
        boxShadow: "0px 4px 10px rgb(0, 102, 255, 0.5)",
        outline: "2px solid rgb(0, 102, 255)",
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
            }} className="mb-3" style={{ height: 3 + "rem" }}>
            <Row className="h-100 px-4">
                <Col xs={3} className="d-flex align-items-center">
                    {data.Name}
                </Col>
                <Col xs={2} className="d-flex align-items-center">
                    {data.PlantType}
                </Col>
                <Col xs={5} className="d-flex align-items-center">
                    <Row className="w-100">
                        <Col className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Badge bg="primary">{data.Irrigation.Schedules.length}</Badge> <span>Schedules</span>
                        </Col>
                        <Col className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                            <Badge bg="warning">{data.Irrigation.Conditions.length}</Badge> <span>Conditions</span>
                        </Col>
                    </Row>
                </Col>

                <Col
                    className="d-flex align-items-center justify-content-end"
                    style={{ gap: "0.5rem" }}
                >
                    <Button
                        onClick={() => handleEdit()}
                        variant="warning"
                        style={{ width: "2rem", height: "2rem", padding: 0 }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button
                        onClick={() => handleCopy()}
                        variant="primary"
                        style={{ width: "2rem", height: "2rem", padding: 0 }}
                    >
                        <i className="fa-solid fa-copy"></i>
                    </Button>
                    <Button
                        onClick={() => handleDelete()}
                        variant="danger"
                        style={{ width: "2rem", height: "2rem", padding: 0 }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};
export default PlanListElement;
