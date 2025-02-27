import React, { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AuthContext from "../../context/UserauthContext";

function Writing({ labelName, type, name, placeholder, loading }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label style={{ color: "white" }}>{labelName}</Form.Label>

      {type === "select" ? (
        <Form.Select name={name} disabled={loading}>
          <option value="">Select Gender</option>
          <option value="male">M</option>
          <option value="female">F</option>
        </Form.Select>
      ) : (
        <Form.Control type={type} name={name} placeholder={placeholder} disabled={loading} />
      )}
    </Form.Group>
  );
}



const Signup = () => {
  let { sendRequest, loading } = useContext(AuthContext);

  useEffect(() => { }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(e, "signup");
  };

  return (
    <Container
      style={{
        background: "url(/src/assets/background.jpg)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        maxWidth: 100 + "%",
        height: 120 + "dvh",
        margin: 0 + "px",
      }}
    >
      <Row>
        <div
          className="col-4 mx-auto"
          style={{
            marginTop: 20 + "px",
            backgroundColor: "grey",
            padding: 30 + "px",
            paddingTop: 12 + "px",
            paddingBottom: 12 + "px",
            borderRadius: 10 + "px",
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
            width: "40%",      // Đảm bảo không bị giới hạn chiều rộng
            maxHeight: "90vh",  // Giới hạn chiều cao để có thể cuộn nếu cần
            overflowY: "auto",  // Nếu form quá dài, nó có thể cuộn riêng
          }}
        >
          <Form onSubmit={(e) => handleSubmit(e)}>
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                margin: 0 + "px",
                marginBottom: 5 + "px",
                color: "white",
              }}
            >
              Sign up
            </p>

            <Row>
              <Col md={8}>
                <Writing labelName="Name" type="text" name="name" placeholder="Enter your name" loading={loading} />
              </Col>
              <Col md={4}>
                {/* Gender */}
                <Writing labelName="Gender" type="select" name="gender" loading={loading} />
              </Col>
            </Row>

            {/* email */}
            <Writing labelName={"Email"} type={"email"} name={"email"} placeholder={"Enter your email"} loading={loading} />

            <Row>
              <Col md={6}>
                {/* phone number */}
                <Writing labelName={"Phone number"} type={"text"} name={"phone_number"} placeholder={"Enter your phone number"} loading={loading} />
              </Col>
              <Col md={6}>
                {/* Date of birth */}
                <Writing labelName={"Date of birth"} type={"date"} name={"date_of_birth"} placeholder={"Enter your date of birth"} loading={loading} />
              </Col>
            </Row>

            {/* password */}
            <Writing labelName={"Password"} type={"password"} name={"password"} placeholder={"Enter your password"} loading={loading} />

            {/* re_password */}
            <Writing labelName={"Confirm password"} type={"password"} name={"re_password"} placeholder={"Re-enter your password"} loading={loading} />

            <Button
              style={{
                width: 100 + "%",
                marginTop: 10 + "px",
              }}
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>

            <p
              style={{
                marginTop: 12 + "px",
                color: "white",
              }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "white",
                }}
              >
                Login here!
              </a>
            </p>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Signup;
