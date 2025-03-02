import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

import PlantContext from "../../context/PlantContext";

const PlantRegister = () => {
    const { sendRequest, loading } = useContext(PlantContext);

    useEffect(() => { }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(e, "register_plant");
    }

    return (
        <Form style={{ borderRadius: 10 + "px", padding: 20 + "px", paddingTop: 10 + "px", paddingBottom: 15 + "px" }} onSubmit={(e) => handleSubmit(e)}>
            <p
                className="text-center"
                style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    margin: 0 + "px",
                    marginBottom: 5 + "px",
                    color: "black",
                }}
            >
                Register a pot
            </p>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                    style={{
                        color: "black",
                    }}
                >
                    <i className="fa-solid fa-fingerprint"></i>{" "}Serial ID
                </Form.Label>
                <Form.Control
                    type="text"
                    name="SerialID"
                    placeholder="Enter pot's serial ID"
                    disabled={loading}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                    style={{
                        color: "black",
                    }}
                >
                    <i className="fa-solid fa-key"></i> Key
                </Form.Label>
                <Form.Control
                    type="text"
                    name="Key"
                    placeholder="Enter pot's key"
                    disabled={loading}
                />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button
                    style={{
                        width: "30%",
                    }}
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default PlantRegister;
