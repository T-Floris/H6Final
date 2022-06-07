import React, { useState } from "react";
import {
  Container,
  Form,
  PasswordInput,
  ShowPasswordBtn,
  Title,
  PasswordLabel,
  SubmitButton,
  Eye,
  EyeInvisible,
} from "./SecurityElements";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
const CHANGEPASSWORD_URL = "Auth/ChangePassword";

const InputForPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [OldPassword, setOldPassword] = useState();

  const [NewPassword, setNewPassword] = useState();



  return (
    <div>
      <PasswordInput 
        type={showPassword ? "text" : "password"} required 

      />
      <ShowPasswordBtn
        onMouseDown={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
          console.log("Down");
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          setShowPassword();
          console.log("UP");
        }}
        type="button"
      >
        {showPassword ? <Eye /> : <EyeInvisible />}
      </ShowPasswordBtn>
    </div>
  );
};

const Security = () => {

  const axiosPrivate = useAxiosPrivate();

  const [showPassword, setShowPassword] = useState(false);


  const [OldPassword, setOldPassword] = useState("");

  const [NewPassword, setNewPassword] = useState("");
  
  const [matchPwd, setMatchPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        CHANGEPASSWORD_URL,
        JSON.stringify({ OldPassword, NewPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      ); 
    } catch (err) {
      console.log("error");
    }
  
  
  }


  return (
    <Container>
      <Title>Change your password</Title>
      <Form onSubmit={handleSubmit}>
        <PasswordLabel>
          Current password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        {/* <InputForPassword /> */}
        <div>
          <PasswordInput 
            type={showPassword ? "text" : "password"} 
            id="OldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
            value={OldPassword}
            required 
          />
          <ShowPasswordBtn
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
              console.log("Down");
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              setShowPassword();
              console.log("UP");
            }}
            type="button"
          >
            {showPassword ? <Eye /> : <EyeInvisible />}
          </ShowPasswordBtn>
        </div>

        <PasswordLabel>
          New password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        {/* <InputForPassword /> */}
        <div>
          <PasswordInput 
            type={showPassword ? "text" : "password"} 
            id="NewPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={NewPassword}
            required 
          />
          <ShowPasswordBtn
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
              console.log("Down");
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              setShowPassword();
              console.log("UP");
            }}
            type="button"
          >
            {showPassword ? <Eye /> : <EyeInvisible />}
          </ShowPasswordBtn>
        </div>


        <PasswordLabel>
          Confirm password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        {/* <InputForPassword /> */}
        <div>
          <PasswordInput 
            type={showPassword ? "text" : "password"} 
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required 
          />
          <ShowPasswordBtn
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
              console.log("Down");
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              setShowPassword();
              console.log("UP");
            }}
            type="button"
          >
            {showPassword ? <Eye /> : <EyeInvisible />}
          </ShowPasswordBtn>
        </div>


        <SubmitButton type="submit" value="Submit">
          Save changes
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Security;
