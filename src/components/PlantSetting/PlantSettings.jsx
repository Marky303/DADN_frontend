import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import Popup from "reactjs-popup";

import PlantContext from "../../context/PlantContext";

const PlantSettings = () => {
  const { serialID } = useParams();

  const { sendRequest, plantList, planList } = useContext(PlantContext);

  const [plantName, setPlantName] = useState(null);

  useEffect(() => {
    sendRequest(0, "get_all_plant");
    sendRequest(0, "get_all_plans");
  }, []);

  useEffect(() => {
    if (plantList && planList) {
      let element;
      const fieldList = ["Name", "planID"];
      for (let i of fieldList) {
        element = document.getElementsByName(i)[0];
        if (i == "Name") {
          for (let j = 0; j < plantList.length; j++) {
            if (plantList[j].SerialID == serialID) {
              setPlantName(plantList[j].Name);
              break;
            }
          }
        } else {
          // TODO
        }
      }
    }
  }, [plantList, planList]);

  const handleApplySettings = (e) => {
    e.preventDefault();

    let potID = null;
    for (const obj of plantList) {
      if (obj.SerialID === serialID) {
        potID = obj.id;
      }
    }

    const body = {
      planID: e.target.planID.value,
      potID,
      Name: e.target.Name.value,
    };
    sendRequest(body, "apply_settings");
  };

  const handleDisownPot = (e) => {
    e.preventDefault();
    sendRequest(e, "disown_pot");
  };

  return (
    <Popup
      trigger={
        <Button
          data-tooltip-id="plantSettingsTooltip"
          data-tooltip-content="Settings"
          style={{
            borderColor: "#878787",
            backgroundColor: "#b3b3b3",
            height: 37 + "px",
            width: 37 + "px",
          }}
          className="p-0 d-flex justify-content-center align-items-center"
        >
          <Tooltip id="plantSettingsTooltip" />
          <i className="fa-solid fa-bars"></i>
        </Button>
      }
      modal
    >
      <div style={{ maxHeight: 18 + "rem", overflowY: "scroll" }}>
        <Form
          style={{
            borderRadius: 10 + "px",
            padding: 20 + "px",
            paddingTop: 10 + "px",
            paddingBottom: 15 + "px",
            height: 18 + "rem",
          }}
          onSubmit={(e) => handleApplySettings(e)}
        >
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
            <i className="fa-solid fa-gear"></i> Pot settings
          </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label
              style={{
                color: "black",
              }}
            >
              <i className="fa-solid fa-seedling"></i> Plant Name
            </Form.Label>
            <Form.Control
              type="text"
              name="Name"
              placeholder="Enter pot's name"
              defaultValue={plantName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label
              style={{
                color: "black",
              }}
            >
              <i className="fa-solid fa-solar-panel"></i> Plan
            </Form.Label>
            <Form.Select
              name="planID"
              defaultValue={plantName}
              aria-label="Default select example"
            >
              <option value="">Choose a plan...</option>
              {planList.map((plan, index) => (
                <option key={index} value={plan.id}>
                  {plan.Name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              style={{
                width: "30%",
              }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
        <hr></hr>
        <Form
          style={{
            borderRadius: 10 + "px",
            padding: 20 + "px",
            paddingTop: 0 + "px",
            paddingBottom: 15 + "px",
            height: 17 + "rem",
          }}
          onSubmit={(e) => handleDisownPot(e)}
        >
          <p
            className="text-center"
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              margin: 0 + "px",
              marginBottom: 5 + "px",
              color: "red",
            }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i> Disown pot
          </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label
              style={{
                color: "black",
              }}
            >
              <i className="fa-solid fa-fingerprint"></i> Serial ID
            </Form.Label>
            <Form.Control
              type="text"
              name="serialID"
              placeholder="Enter pot's serial ID"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              style={{
                width: "30%",
              }}
              variant="danger"
              type="submit"
            >
              Accept
            </Button>
          </div>
        </Form>
      </div>
    </Popup>
  );
};

export default PlantSettings;
