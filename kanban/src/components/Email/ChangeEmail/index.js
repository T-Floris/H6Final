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
  } from "./ChangeEmailElements";

import axios from "../../../api/axios";

const EMAIL_REGEX =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

const REGISTER_URL = "TokenConfirmation/ChangeEmail";

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

const ChangeEmail = () => {
  const emailAddressRef = useRef();
  const errRef = useRef();

  /// Email state
  const [emailAddress, setEmailAddress] = useState("");
  const [validEmailAddress, setValidEmailAddress] = useState(false);
  const [emailAddressFocus, setEmailAddressFocus] = useState(false);

  /// Error state
  const [errMsg, setErrMsg] = useState([""]);
  const [success, setSuccess] = useState(false);



  /// EmailAddress REGEX test
  useEffect(() => {
    setValidEmailAddress(EMAIL_REGEX.test(emailAddress));
  }, [emailAddress]);

  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, [emailAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(emailAddress);
    const Token = Token1.split(' ').join('+');

    if (!v1 ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          UserId,
          "Token" : Token,
          emailAddress
          
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
        setErrMsg("Change password Failed");
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

            <Title>Change email</Title>

            <Form onSubmit={handleSubmit}>

              {/* Password */}
              <Label htmlFor="email">
                Email Address:
                <TickIcon valid={validEmailAddress} />
                <CrossIcon invalid={validEmailAddress || !emailAddress} />
              </Label>
              <InputField
                type="text"
                id="emailaddress"
                ref={emailAddressRef}
                autoComplete="off"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={emailAddress}
                required
                aria-invalid={validEmailAddress ? "false" : "true"}
                aria-describedby="emailaddressnote"
                onFocus={() => setEmailAddressFocus(true)}
                onBlur={() => setEmailAddressFocus(false)}
              />
              <Attention
                id="emailaddressnote"
                attention={
                  emailAddressFocus && emailAddress && !validEmailAddress
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
                Confirm new email
              </CreateButton>
            </Form>
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default ChangeEmail;

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//       console.log(auth)
//         // auth?.roles?.find(role => allowedRoles?.includes(role))
//         //     ? <Outlet />
//         //     : auth?.user
//         //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//         //         : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;
