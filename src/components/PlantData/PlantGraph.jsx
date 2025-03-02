import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
} from "firebase/firestore";

import { Row, Col, Form } from "react-bootstrap";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

import PlantContext from "../../context/PlantContext";

const PlantGraph = () => {
    const { serialID } = useParams();
    const { initializeFirestore, currentGraph } = useContext(PlantContext);

    const [hoursAgo, setHoursAgo] = useState(1);

    const [data, setData] = useState([]);

    useEffect(() => {
        let db = initializeFirestore();
        const logsRef = collection(db, "Plant_" + currentGraph, serialID, "Logs");

        const ticksAgo = Date.now() / 1000 - hoursAgo * 60 * 60;

        const q = query(
            logsRef,
            orderBy("Time", "asc"),
            where("Time", ">=", ticksAgo)
        );

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                let logs = querySnapshot.docs.map((doc) => doc.data());
                setData(logs);
            },
            (err) => {
                console.error("Error fetching temperature logs:", err);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [serialID, currentGraph, hoursAgo]);

    return (
        <div
            style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: 15 + "px",
            }}
            className="p-1 pt-3"
        >
            <Row className="px-4 mb-3">
                <Col className="px-1 d-flex align-items-center">
                    <span className="me-2">Stat</span>
                    <Form.Select>
                        <option>Temperature</option>
                        <option>Light</option>
                        <option>SoilHumidity</option>
                        <option>Moisture</option>
                    </Form.Select>
                </Col>
                <Col className="px-1 d-flex align-items-center">
                    <span className="me-2">From</span>
                    <input type="date" className="form-control" name="from" />
                </Col>
                <Col className="px-1 d-flex align-items-center">
                    <span className="me-2">To</span>
                    <input type="date" className="form-control" name="from" />
                </Col>
            </Row>
            <ResponsiveContainer width="95%" height="87%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="Time"
                        tickFormatter={(time) => format(new Date(time * 1000), "HH:mm")}
                    />
                    <YAxis
                        tickFormatter={(value) => (Math.round(value * 10) / 10).toFixed(1)}
                    />
                    <Tooltip
                        formatter={(value) => (Math.round(value * 10) / 10).toFixed(1)}
                        labelFormatter={(time) => format(new Date(time * 1000), "HH:mm")}
                    />
                    <Line type="monotone" dataKey="Value" stroke="#FF5733" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PlantGraph;
