import { useRef, useState, useEffect } from "react";
//import { Link, useNavigate, useLocation } from "react-router-dom";

import {
    Container,
    Wrapper,
    Img,
    Section,
    ErrorMsg,
    Title,
    Form,
    Label,
    TickIcon,
    CrossIcon,
    InfoIcon,
    CreateButton,
    InputField,
    LLink,
    Text,
    Span,
    Attention,
  } from "./ForgotPasswordElements";

import { defaultvalue } from "../../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

const REGISTER_URL = "Auth/Register";

const sendErrMsg = (errMsg) => {
  return (
    <>
      {errMsg[0]}
      <br />
      {errMsg[1]}
    </>
  );
};

const ForgotPassword = () => {

  const errRef = useRef();

  /// Password state
  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  /// Match password State
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  /// Error state
  const [errMsg, setErrMsg] = useState([""]);
  const [success, setSuccess] = useState(false);



  /// Password REGEX test and password match
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(password);
    if (!v1 ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await defaultvalue.post(
        REGISTER_URL,
        JSON.stringify({
          password
          
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(response?.data.token);
      setSuccess(true);

      //clear state and controlled inputs
      //need value attrib on inputs for this

      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } 
      else if (err.response?.status === 409) {
        if (err.response.data.errors.length === 2) {
          setErrMsg([err.response.data.errors[0], err.response.data.errors[1]]);
        } else {
          setErrMsg([err.response.data.errors[0]]);
        }
      } else {
        setErrMsg("Registration Failed");
      }
      //errRef.current.focus();
    }
  };
  return (
    <Container>
      <Wrapper>
        <Img
          src={require("../../../images/welcome_cats.svg").default}
          alt="Welcome cats"
        />
        {success ? (
          <Section>
            <Title>Success!</Title>
            <Text>
              <LLink to="/login">Sign In</LLink>
            </Text>
          </Section>
        ) : (
          <Section>
            <ErrorMsg ref={errRef} errorMsg={errMsg} aria-live="assertive">
              {errMsg.length === 1
                ? errMsg
                : errMsg.length === 2
                ? sendErrMsg(errMsg)
                : errMsg}
            </ErrorMsg>

            <Title>Register</Title>

            <Form onSubmit={handleSubmit}>

              {/* Password */}
              <Label htmlFor="password">
                Password:
                <TickIcon valid={validPwd} />
                <CrossIcon invalid={validPwd || !password} />
              </Label>
              <InputField
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={password}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <Attention id="pwdnote" attention={pwdFocus && !validPwd}>
                <InfoIcon />
                At least 8 characters.
                <br />
                Must include uppercase and lowercase letters, <br /> a number
                and a special character.
                <br />
                Allowed special characters:{" "}
                <Span aria-label="exclamation mark">!</Span>{" "}
                <Span aria-label="at symbol">@</Span>{" "}
                <Span aria-label="hashtag">#</Span>{" "}
                <Span aria-label="dollar sign">$</Span>{" "}
                <Span aria-label="percent">%</Span>
              </Attention>

              {/* Confirm password */}
              <Label htmlFor="confirm_pwd">
                Confirm Password:
                <TickIcon valid={validMatch && matchPwd} />
                <CrossIcon invalid={validMatch || !matchPwd} />
              </Label>
              <InputField
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <Attention id="confirmnote" attention={matchFocus && !validMatch}>
                <InfoIcon />
                Must match the first password input field.
              </Attention>

              <CreateButton
                disabled={                  
                  !validPwd ||
                  !validMatch
                }
              >
                Create account
              </CreateButton>
            </Form>
            <Text>
              Already have an account?
              <LLink to="/login">Log in</LLink>
            </Text>
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;