import {
  Form, Input, FormGroup, Label, Container, Button, Col, Row,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import "./login.css";
import p1 from "../Images/p1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError } = useSelector((state) => state.users);

  const handleLogin = async (e) => {
    e.preventDefault();//Prevent page reload

    const result = await dispatch(login({ email, password }));

    const user = result?.payload;

    if (user) {
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id;
      navigate("/CourseList");
    }
  };

  return (
    <div className="login-page">
      <Container className="mt-5">
        <div className="login-wrapper">

          <div className="login-left">
            <Form onSubmit={handleLogin}>

              {isError && (
                <p style={{ color: "red" }}>
                  Email or Password is incorrect
                </p>
              )}

              {isLoading && <p>Logging in...</p>}

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Button color="primary" type="submit">
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="mt-3">
                No account? <Link to="/register">Sign up</Link>
              </p>

            </Form>
          </div>

          <div className="login-right">
            <img src={p1} alt="login" />
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Login;