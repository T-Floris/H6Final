import React from "react";
import styled from "styled-components";
import NavbarLite from "../../../components/Menus/NavbarLite";
import ForgotPassword from "../../../components/Auth/User/ForgotPassword";

const Container = styled.div`
  background-color: #562bf6;
  height: 100vh;
`;

const ForgotPasswordPage = () => {
    return (
        <Container>
          <NavbarLite />
          <ForgotPassword />
        </Container>
    );
}  
export default ForgotPasswordPage;