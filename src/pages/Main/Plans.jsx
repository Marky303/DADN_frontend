import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import PlanListElement from "../../components/Plans/PlanListElement";

import PlantContext from "../../context/PlantContext";

const Plans = () => {
    const navigate = useNavigate();
    const { sendRequest, planList } = useContext(PlantContext);

    useEffect(() => {
        sendRequest(0, "get_all_plans");
    }, []);

    useEffect(() => { }, [planList]);

    return (
        <div
            className="d-flex justify-content-center"
            style={{
                paddingTop: 1 + "rem",
                height: 90.9 + "dvh",
                overflowY: "scroll",
                backgroundColor: "rgb(237, 237, 237, 0.7)",
            }}
        >
            <Card style={{ width: 97 + "%", height: 86 + "dvh" }}>
                <Card.Header className="d-flex align-items-center">
                    <i className="fa-solid fa-solar-panel me-2"></i> Your saved plans
                    <div className="ms-auto">
                        <Button onClick={(e) => navigate("/plans/createplan")}>
                            Add plan <i className="fa-solid fa-plus"></i>
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-4 pt-3" style={{ overflowY: "scroll" }}>
                    {planList.map((data, index) => {
                        return <PlanListElement key={index} planData={data} />
                    })}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Plans;
