import { useRef, useState, useEffect } from "react";

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
    Span,
    Attention,
  } from "./ChangePasswordElements";

import defaultvalue  from "../../../api/axios";



const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

const REGISTER_URL = "TokenConfirmation/ForgotPassword";

const queryParams = new URLSearchParams(window.location.search);

const UserId = queryParams.get('UserId');
const Token1 = queryParams.get('Token');


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
  const [NewPassword, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  /// Match password State
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  /// Error state
  const [errMsg, setErrMsg] = useState([""]);
  //const [success, setSuccess] = useState(false);



  /// Password REGEX test and password match
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(NewPassword));
    setValidMatch(NewPassword === matchPwd);
  }, [NewPassword, matchPwd]);

  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, [NewPassword, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(NewPassword);
    const Token = Token1.split(' ').join('+');

    if (!v1 ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await defaultvalue.post(
        REGISTER_URL,
        JSON.stringify({
          UserId,
          "Token" : Token,
          NewPassword
        }),
        {
          headers: { "Content-Type": "application/json" }          
        }
      );
      // console.log(response?.data);
      // console.log(response?.data.token);
      //setSuccess(true);

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
          src={require("../../../images/welcome_cats.svg").default}alt="Confirm eamil"
        />
          <Section>
            <ErrorMsg ref={errRef} errorMsg={errMsg} aria-live="assertive">
              {errMsg.length === 1
                ? errMsg
                : errMsg.length === 2
                ? sendErrMsg(errMsg)
                : errMsg}
            </ErrorMsg>

            <Title>Set new password</Title>

            <Form onSubmit={handleSubmit}>

              {/* Password */}
              <Label htmlFor="password">
                Password:
                <TickIcon valid={validPwd} />
                <CrossIcon invalid={validPwd || !NewPassword} />
              </Label>
              <InputField
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={NewPassword}
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
          </Section>        
      </Wrapper>
    </Container>
  );
};
export default ForgotPassword;