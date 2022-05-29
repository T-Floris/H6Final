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

const InputForPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <PasswordInput type={showPassword ? "text" : "password"} required />
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
  return (
    <Container>
      <Title>Change your password</Title>
      <Form>
        <PasswordLabel>
          Current password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        <InputForPassword />

        <PasswordLabel>
          New password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        <InputForPassword />

        <PasswordLabel>
          Confirm password<span style={{ color: "red" }}>*</span>
        </PasswordLabel>
        <InputForPassword />

        <SubmitButton type="submit" value="Submit">
          Save changes
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Security;
