import { useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

import AuthContext from "../../context/UserauthContext";
import theme from "../../theme";


const Login = () => {
  let { sendRequest, loading } = useContext(AuthContext);

  useEffect(() => { }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(e, "login");
  };

  return (
    <Container
      style={{
        width: "100%",
        background: "url(/src/assets/background.jpg)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: theme.trello.homeHeight,
        overflowY: "auto",
        maxWidth: 100 + "%",
      }}
    >
      <Row>
        <div
          className="col-4 mx-auto"
          style={{
            minWidth: 300 + "px",
            margin: 40 + "px",
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
                fontSize: "40px",
                margin: 10 + "px",
                marginBottom: 30 + "px",
                color: "white",
              }}
            >
              Login
            </p>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <i className="fa-solid fa-envelope"></i> Email address
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter your email"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <i className="fa-solid fa-key"></i> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                style={{
                  color: "white",
                }}
                type="checkbox"
                name="rememberMe"
                label="Remember me"
                disabled={loading}
              />
            </Form.Group>
            <Button
              style={{
                width: 100 + "%",
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
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                style={{
                  color: "white",
                }}
              >
                Sign up here!
              </a>
            </p>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
