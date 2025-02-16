import React, { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

import AuthContext from "../../context/UserauthContext";

const Signup = () => {
  let { sendRequest, loading } = useContext(AuthContext);

  useEffect(() => {}, [loading]);

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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  color: "white",
                }}
              >
                <i className="fa-solid fa-user"></i> Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  color: "white",
                }}
              >
                <i class="fa-solid fa-envelope"></i> Email address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{
                  color: "white",
                }}
              >
                <i class="fa-solid fa-key"></i> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{
                  color: "white",
                }}
              >
                <i class="fa-solid fa-check"></i> Confirm password
              </Form.Label>
              <Form.Control
                type="password"
                name="re_password"
                placeholder="Re-enter your password"
                disabled={loading}
              />
            </Form.Group>

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
