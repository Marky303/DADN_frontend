import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Button } from "react-bootstrap";
import PlanListElement from "../../components/Plans/PlanListElement";

import PlantContext from "../../context/PlantContext";
import Box from "@mui/material/Box";
import theme from "../../theme";

const Plans = () => {
  const navigate = useNavigate();
  const { sendRequest, planList } = useContext(PlantContext);

  useEffect(() => {
    sendRequest(0, "get_all_plans");
  }, []);

  useEffect(() => {}, [planList]);

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        width: "100%",
        overflowY: "auto",
        backgroundColor: "#EEE",
        padding: "16px",
      }}
    >
      <Card
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Card.Header className="d-flex align-items-center">
          <i className="fa-solid fa-solar-panel me-2"></i> Your saved plans
          <div className="ms-auto">
            <Button onClick={() => navigate("/plans/createplan")}>
              Add plan <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-4 pt-3" style={{ overflowY: "scroll" }}>
          {planList.map((data, index) => {
            return <PlanListElement key={index} planData={data} />;
          })}
        </Card.Body>
      </Card>
    </Box>
  );
};

export default Plans;
