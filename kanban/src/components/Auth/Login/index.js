import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import {
  Container,
  Wrapper,
  Img,
  Section,
  ErrorMsg,
  Title,
  Form,
  Label,
  LoginButton,
  InputField,
  CheckBoxContainer,
  CheckBox,
  LLink,
  Text,
  Span,
} from "./LoginElements";

import { defaultvalue } from "../../../api/axios";
const LOGIN_URL = "Auth/Login";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  // console.log(setAuth);
  // console.log(persist);
  // console.log(setPersist);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [EmailAddress, setUser] = useState("");
  const [Password, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [EmailAddress, Password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await defaultvalue.post(
        LOGIN_URL,
        JSON.stringify({ EmailAddress, Password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = response?.data?.token;
      const roles = response?.data?.roles;
      
      setAuth({ EmailAddress, Password, roles, token });
      setUser("");
      setPwd("");

      console.log(response);
      navigate("/userstart", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
           console.log(err?.response);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", true);
  }, [persist]);

  return (
    <Container>
      <Wrapper>
        <Img src={require("../../../images/sign_in.svg").default} alt="Login" />
          <Section>
            {/* assertive: should only be used for time-sensitive/critical notifications that absolutely require the user's immediate attention. */}
            <ErrorMsg ref={errRef} errorMsg={errMsg} aria-live="assertive">
              {errMsg}
            </ErrorMsg>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="username">Username or Email:</Label>
              <InputField
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={EmailAddress}
                required
              />

              <Label htmlFor="password">Password:</Label>
              <InputField
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={Password}
                required
              />
              <LoginButton>Login</LoginButton>
              <CheckBoxContainer>
                <CheckBox
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
                <Label htmlFor="persist">Remember me?</Label>
              </CheckBoxContainer>
            </Form>
            <Text>
              Need an Account?
              <Span>
                <LLink to="/register">Register</LLink>
              </Span>
            </Text>
          </Section>
      </Wrapper>
    </Container>
  );
};

export default Login;
