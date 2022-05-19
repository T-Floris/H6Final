import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Video from "../../../videos/video.mp4";
import { ButtonTransparent } from "../../Assets/ButtonElements";
import {
  Container,
  Background,
  VideoBackground,
  Content,
  Title,
  Text,
  BtnWrap,
  IconWrap,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  //i18next
  const { t } = useTranslation();

  return (
    <Container id="home">
      <Background>
        <VideoBackground autoPlay loop muted src={Video} type="video/mp4" />
      </Background>
      <Content>
        <Title>{t("kanban")}</Title>
        <Text>{t("hero_section_text")}</Text>
        <BtnWrap>
          {/* Button is import from ButtonElements.js*/}
          <ButtonTransparent
            to="/signin"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            {t("hero_section_button_text")}{" "}
            <IconWrap>{hover ? <ArrowRight /> : <ArrowForward />}</IconWrap>
          </ButtonTransparent>
        </BtnWrap>
      </Content>
    </Container>
  );
};

export default HeroSection;
