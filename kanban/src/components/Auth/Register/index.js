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
  Span,
  Attention,
} from "./RegisterElements";
import { defaultvalue } from "../../../api/axios";


const FIRSTNAME_REGEX = /^[A-z][A-z]{0,99}/;
const LASTNAME_REGEX = /^[A-z][A-z]{0,99}/;
const USER_REGEX = /^[A-z0-9-_]{4,24}$/;
//const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const EMAIL_REGEX =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

const REGISTER_URL = "Auth/Register";

const AvatarArray = 
  [
    "../../../images/Profile/profil-1.svg",
    "../../../images/Profile/profil-2.svg",
    "../../../images/Profile/profil-3.svg",
    "../../../images/Profile/profil-4.svg",
    "../../../images/Profile/profil-5.svg",
    "../../../images/Profile/profil-6.svg",
    "../../../images/Profile/profil-7.svg",
    "../../../images/Profile/profil-8.svg",
    "../../../images/Profile/profil-9.svg",
    "../../../images/Profile/profil-10.svg"
  ]

const sendErrMsg = (errMsg) => {
  return (
    <>
      {errMsg[0]}
      <br />
      {errMsg[1]}
    </>
  );
};

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailAddressRef = useRef();

  const errRef = useRef();

  /// firstname state
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  /// Lastname state
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  /// Username state
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  /// Email state
  const [emailAddress, setEmailAddress] = useState("");
  const [validEmailAddress, setValidEmailAddress] = useState(false);
  const [emailAddressFocus, setEmailAddressFocus] = useState(false);

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

  /// set focus
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  /// FirstName REGEX test
  useEffect(() => {
    setValidFirstName(FIRSTNAME_REGEX.test(firstName));
  }, [firstName]);

  /// LastName REGEX test
  useEffect(() => {
    setValidLastName(LASTNAME_REGEX.test(lastName));
  }, [lastName]);

  /// UserName REGEX test
  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  /// EmailAddress REGEX test
  useEffect(() => {
    setValidEmailAddress(EMAIL_REGEX.test(emailAddress));
  }, [emailAddress]);

  /// Password REGEX test and password match
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, userName, emailAddress, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = FIRSTNAME_REGEX.test(firstName);
    const v2 = LASTNAME_REGEX.test(lastName);
    const v3 = USER_REGEX.test(userName);
    const v4 = EMAIL_REGEX.test(emailAddress);
    const v5 = PWD_REGEX.test(password);
    const Avatar = AvatarArray[Math.floor(Math.random()*AvatarArray.length)];
    
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await defaultvalue.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          userName,
          emailAddress,
          password,
          Avatar
          
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

      setFirstName("");
      setLastName("");
      setUserName("");
      setEmailAddress("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
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
              {/* First name */}
              <Label htmlFor="firstname">
                First Name:
                <TickIcon valid={validFirstName} />
                <CrossIcon invalid={validFirstName || !firstName} />
              </Label>
              <InputField
                type="text"
                id="firstname"
                ref={firstNameRef}
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="firstnamenote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <Attention
                id="firstnamenote"
                attention={firstNameFocus && firstName && !validFirstName}
              >
                <InfoIcon />
                1 characters.
                <br />
                Letters allowed.
              </Attention>

              {/* Last name */}
              <Label htmlFor="lastname">
                Last Name:
                <TickIcon valid={validLastName} />
                <CrossIcon invalid={validLastName || !lastName} />
              </Label>
              <InputField
                type="text"
                id="lastname"
                ref={lastNameRef}
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="lastnamenote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <Attention
                id="lastnamenote"
                attention={lastNameFocus && lastName && !validLastName}
              >
                <InfoIcon />
                1 characters.
                <br />
                Letters allowed.
              </Attention>

              {/* Username */}
              <Label htmlFor="username">
                Username:
                <TickIcon valid={validUserName} />
                <CrossIcon invalid={validUserName || !userName} />
              </Label>
              <InputField
                type="text"
                id="username"
                ref={userNameRef}
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
                aria-invalid={validUserName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
              />
              <Attention
                id="uidnote"
                attention={userNameFocus && userName && !validUserName}
              >
                <InfoIcon />
                4 to 24 characters.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </Attention>

              {/* Email address */}
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
                  !validFirstName ||
                  !validLastName ||
                  !validUserName ||
                  !validEmailAddress ||
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

export default Register;
