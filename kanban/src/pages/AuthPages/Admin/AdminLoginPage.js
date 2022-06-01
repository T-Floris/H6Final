import React from "react";
import styled from "styled-components";
import AdminLogin from "../../../components/Auth/Admin/Login";
import NavbarLite from "../../../components/Menus/NavbarLite";

import Video from "../../../videos/matrix.mp4";

const Container = styled.div`
  background-color: #562bf6;
  height: 100vh;
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

const AdminLoginPage = () => {
  return (
    <Container>
      <NavbarLite />
      <Background>
        <VideoBackground autoPlay loop muted src={Video} type="video/mp4" />
      </Background>
      
      <AdminLogin />
    </Container>
  );
};

export default AdminLoginPage;
