import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Tooltip } from 'react-tooltip'

import Notification from "./Notification";

import {
    doc,
    onSnapshot,
    getDoc,
    updateDoc
} from "firebase/firestore";

import PlantContext from "../../context/PlantContext";

const PlantNotifications = () => {
    const { serialID } = useParams();
    const { initializeFirestore } = useContext(PlantContext);

    const [notifications, setNotifications] = useState([]);
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {
        let db = initializeFirestore();
        const documentRef = doc(db, "Plant_Notifications", serialID);

        const unsubscribe = onSnapshot(
            documentRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const logs = docSnapshot.data().Logs || [];

                    const revsersedLogs = logs.slice().reverse();
                    setNotifications(revsersedLogs);

                    const unseen = revsersedLogs.filter((log) => !log.Seen).length;
                    setUnseenCount(unseen);
                }
            },
            (err) => {
                console.error("Error listening to document:", err);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [serialID]);

    const handleMarkAsRead = async () => {
        try {
            let db = initializeFirestore();
            const documentRef = doc(db, "Plant_Notifications", serialID);

            const docSnap = await getDoc(documentRef);
            if (docSnap.exists()) {
                let updatedLogs = docSnap.data().Logs.map(log => ({
                    ...log,
                    Seen: true
                }));

                await updateDoc(documentRef, { Logs: updatedLogs });
            }
        } catch (error) {
            console.error("Error updating notifications:", error);
        }
    }

    return (
        <Card style={{ height: 80 + "dvh" }}>
            <Card.Header
                style={{ background: "#e6e6e6" }}
                className="d-flex align-items-center"
            >
                <i className="fa-solid fa-bell"></i>&nbsp;Notifications&nbsp;
                {unseenCount != 0 ? (
                    <Badge
                        className="p-0 px-1 pb-1"
                        style={{
                            fontSize: 15 + "px",
                            height: 23 + "px",
                            lineHeight: 23 + "px",
                        }}
                        bg="danger"
                    >
                        {unseenCount}
                    </Badge>
                ) : (
                    ""
                )}
                <Button
                    data-tooltip-id="markAsReadTooltip"
                    data-tooltip-content="Mark as read"
                    onClick={handleMarkAsRead}
                    style={{ height: "90%", width: "auto" }}
                    className="ms-auto p-1 d-flex justify-content-center align-items-center"
                >
                    <Tooltip id="markAsReadTooltip" />
                    <i className="fa-solid fa-check"></i>
                </Button>

            </Card.Header>
            <Card.Body
                className="p-3 pt-2"
                style={{ maxHeight: 100 + "%", overflowY: "auto" }}
            >
                {notifications && notifications.length != 0
                    ? notifications.map((notification, index) => (
                        <Notification
                            key={index}
                            type={notification.Type}
                            message={notification.Content}
                            timeStamp={notification.Time}
                            seen={notification.Seen}
                        ></Notification>
                    ))
                    : ""}
            </Card.Body>
        </Card>
    );
};

export default PlantNotifications;
