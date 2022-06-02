import React from "react";
import styled from "styled-components";
import Login from "../../../components/Auth/User/Login";
import NavbarLite from "../../../components/Menus/NavbarLite";

const Container = styled.div`
  background-color: #562bf6;
  height: 100vh;
`;

const LoginPage = () => {
  return (
    <Container>
      <NavbarLite />
      <Login />
    </Container>
  );
};

export default LoginPage;
