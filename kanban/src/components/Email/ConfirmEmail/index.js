import { useRef, useState, useEffect } from "react";

import {
    Container,
    Wrapper,
    Img,
    Section,
    ErrorMsg,
    Title,
    Form,
    CreateButton,
  } from "./ConfirmEmailElements";

import axios from "../../../api/axios";

const REGISTER_URL = "TokenConfirmation/ConfirmEmail";

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

const ConfirmEmail = () => {


  const errRef = useRef();




  /// Error state
  const [errMsg, setErrMsg] = useState([""]);
  //const [success, setSuccess] = useState(false);




  /// set error msg
  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const Token = Token1.split(' ').join('+');


    if (!true ) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          UserId,
          "Token" : Token
          

        }),
        {
          headers: { "Content-Type": "application/json" }          
        }
      );
      console.log(UserId);     
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

            <Title>Confirm eamil</Title>

            <Form onSubmit={handleSubmit}>
              <CreateButton>
                Confirm eamil
              </CreateButton>
            </Form>
          </Section>        
      </Wrapper>
    </Container>
  );
};

export default ConfirmEmail;