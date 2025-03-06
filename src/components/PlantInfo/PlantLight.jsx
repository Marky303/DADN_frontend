import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

import {
    collection,
    doc,
    query,
    orderBy,
    limit,
    onSnapshot,
    getDoc,
} from "firebase/firestore";

import PlantContext from "../../context/PlantContext";

const PlantLight = () => {
    const ref = useRef(null);
    const { serialID } = useParams();
    const { initializeFirestore, changeGraph } = useContext(PlantContext);

    let [value, setValue] = useState(null);
    const [desiredRange, setDesiredRange] = useState(null);

    useEffect(() => {
        const db = initializeFirestore();
        const planDocRef = doc(db, "Plant_Plan", serialID);
    
        const unsubscribe = onSnapshot(
            planDocRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const planData = docSnap.data().Plan;
                    if (planData?.StatRanges?.Light) {
                        const { min, max } = planData.StatRanges.Light;
                        setDesiredRange({ min, max });
                    } else {
                        setDesiredRange(null);
                    }
                } else {
                    setDesiredRange(null);
                }
            },
            (error) => {
                console.error("Error listening to plant plan:", error);
            }
        );
    
        return () => {
            unsubscribe();
        };
    }, [serialID]);

    useEffect(() => {
        const db = initializeFirestore();
        const logsRef = collection(db, "Plant_Light", serialID, "Logs");

        const q = query(logsRef, orderBy("Time", "desc"), limit(1));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const latestEntry = querySnapshot.docs[0].data();
                    setValue(latestEntry.Value);
                } else {
                    setValue(null);
                }
            },
            (err) => {
                console.error("Error listening to logs:", err);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [serialID]);

    const handleGraphChange = () => {
        changeGraph("Light");
    }

    const roundToOneDecimal = (num) => {
        return Math.round(num * 10) / 10;
    }
    
    const hoverStyles = {
        transform: "scale(1.01)",
        boxShadow: "0px 4px 10px rgb(0, 102, 255, 0.5)",
        outline: "2px solid rgb(0, 102, 255)",
        cursor: "pointer",
    };

    const clickStyles = {
        transform: "scale(0.96)",
        boxShadow: "0px 4px 20px rgb(0, 102, 255, 0.8)",
        outline: "2px solid rgb(0, 102, 255)",
        cursor: "pointer",
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
            }}
            onMouseDown={() => {
                Object.assign(ref.current.style, clickStyles);
            }}
            onMouseUp={() => {
                Object.assign(ref.current.style, hoverStyles);
            }}
            onClick={handleGraphChange}
            style={{
                backgroundColor: "#ffff1f",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            className="p-3 px-3"
        >
            <Row className="align-items-center h-100">
                <Col xs={8} className="d-flex align-items-center h-100">
                    <div>
                        <h4
                            style={{
                                fontSize: "25px",
                                fontWeight: 500,
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                            }}
                        >
                            <i className="fa-solid fa-sun"></i>{" "}
                            Light{" "}
                            {value != null && desiredRange != null ? (
                                value >= desiredRange.min && value <= desiredRange.max ? (
                                    <Badge
                                        className="p-0 px-1 pb-1"
                                        style={{
                                            fontSize: 15 + "px",
                                            height: 23 + "px",
                                            lineHeight: 23 + "px",
                                        }}
                                        bg="success"
                                    >
                                        OK
                                    </Badge>
                                ) : value < desiredRange.min ? (
                                    <Badge
                                        className="p-0 px-1 pb-1"
                                        style={{
                                            fontSize: 15 + "px",
                                            height: 23 + "px",
                                            lineHeight: 23 + "px",
                                        }}
                                        bg="danger"
                                    >
                                        Dark
                                    </Badge>
                                ) : (
                                    <Badge
                                        className="p-0 px-1 pb-1"
                                        style={{
                                            fontSize: 15 + "px",
                                            height: 23 + "px",
                                            lineHeight: 23 + "px",
                                        }}
                                        bg="danger"
                                    >
                                        Bright
                                    </Badge>
                                )
                            ) : (
                                ""
                            )}
                        </h4>
                        <small style={{ fontSize: 17 + "px", fontWeight: 500 }}>
                            Desired range: {desiredRange ? desiredRange.min : ""}% -{" "}
                            {desiredRange ? desiredRange.max : ""}%
                        </small>
                    </div>
                </Col>
                <Col xs={4} className="d-flex align-items-center justify-content-end h-100">
                    <p
                        style={{
                            lineHeight: 100 + "%",
                            fontSize: 45 + "px",
                            fontWeight: 700,
                            margin: 0,
                            textAlign: "right",
                        }}
                    >
                        {value != null ? roundToOneDecimal(value) + "%" : ""}
                    </p>
                </Col>
            </Row>
        </Card>
    );
};

export default PlantLight;
