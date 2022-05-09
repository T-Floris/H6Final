import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Magnifier,
  ButtonContainer,
  HomeLink,
} from "./PageNotFoundElements";
import { CTAButton } from "../Assets/ButtonElements";
import Image from "../../images/magnifier.gif";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404 Page Not Found</Title>
      <Magnifier src={Image} />
      <Text>We are sorry but the page you are looking for does not exist.</Text>
      <ButtonContainer>
        {/* quick fix: without div shrinks  */}
        <div>
          <CTAButton
            onClick={() => navigate(-1)}
            style={{ width: "130px", margin: "20px" }}
          >
            Previous page
          </CTAButton>
        </div>
        <HomeLink to="/">
          <CTAButton style={{ width: "130px", margin: "20px" }}>Home</CTAButton>
        </HomeLink>
      </ButtonContainer>
    </Container>
  );
};

export default PageNotFound;
