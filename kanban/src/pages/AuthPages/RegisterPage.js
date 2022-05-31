import React from "react";
import styled from "styled-components";
import Register from "../../components/Auth/Register";
import NavbarLite from "../../components/Menus/NavbarLite";

const Container = styled.div`
  background-color: #562bf6;
  height: 100vh;
`;

const RegisterPage = () => {
  return (
    <Container>
      <NavbarLite />
      <Register />
    </Container>
  );
};

export default RegisterPage;
