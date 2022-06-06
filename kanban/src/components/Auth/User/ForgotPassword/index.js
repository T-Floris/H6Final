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
    LLink,
    Text,
    Attention,
  } from "./ForgotPasswordElements";

import axios from "../../../../api/axios";

const EMAIL_REGEX =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

const FORGOT_URL = "Auth/ForgotPassword";

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
  const emailAddressRef = useRef();
  const errRef = useRef();

  /// Email state
  const [EmailAddress, setEmailAddress] = useState("");
  const [validEmailAddress, setValidEmailAddress] = useState(false);
  const [emailAddressFocus, setEmailAddressFocus] = useState(false);

  /// Error state
  const [errMsg, setErrMsg] = useState([""]);
  const [success, setSuccess] = useState(false);



  /// EmailAddress REGEX test
  useEffect(() => {
    setValidEmailAddress(EMAIL_REGEX.test(EmailAddress));
  }, [EmailAddress]);

  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, [EmailAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack

    const v1 = EMAIL_REGEX.test(EmailAddress);

    if (!v1 ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        FORGOT_URL,
        JSON.stringify({ EmailAddress }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);

      //clear state and controlled inputs
      //need value attrib on inputs for this

      setEmailAddress("");
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
        setSuccess(true);
      }
      //errRef.current.focus();
    }
  };
  return (
    <Container>
      <Wrapper>
        <Img
          src={require("../../../../images/welcome_cats.svg").default}
          alt="Welcome cats"
        />
        {success ? (
          <Section>
            <Title>Email has ben send if exists</Title>
            <Text>
              <LLink to="/login">login</LLink>
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

            <Title>Forgot password</Title>

            <Form onSubmit={handleSubmit}>

              {/* Password */}
              <Label htmlFor="email">
                Email Address:
                <TickIcon valid={validEmailAddress} />
                <CrossIcon invalid={validEmailAddress || !EmailAddress} />
              </Label>
              <InputField
                type="text"
                id="emailaddress"
                ref={emailAddressRef}
                autoComplete="off"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={EmailAddress}
                required
                aria-invalid={validEmailAddress ? "false" : "true"}
                aria-describedby="emailaddressnote"
                onFocus={() => setEmailAddressFocus(true)}
                onBlur={() => setEmailAddressFocus(false)}
              />
              <Attention
                id="emailaddressnote"
                attention={
                  emailAddressFocus && EmailAddress && !validEmailAddress
                }
              >
                <InfoIcon />
                Must be an email.
              </Attention>
              <CreateButton
                disabled={                  
                  !validEmailAddress
                }
              >
                Resset password
              </CreateButton>
            </Form>
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
