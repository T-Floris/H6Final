import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Video from "../../../videos/video.mp4";
import { ButtonTransparent } from "../../Assets/ButtonElements";
import {
  HeroContainer,
  HeroBackground,
  VideoBackground,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
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
    <HeroContainer id="home">
      <HeroBackground>
        <VideoBackground autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBackground>
      <HeroContent>
        <HeroH1>{t("kanban")}</HeroH1>
        <HeroP>{t("hero_section_text")}</HeroP>
        <HeroBtnWrapper>
          {/* Button is import from ButtonElements.js*/}
          <ButtonTransparent
            to="/signin"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            {t("hero_section_button_text")} {hover ? <ArrowForward /> : <ArrowRight />}
          </ButtonTransparent>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
