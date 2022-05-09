import React from "react";
import { useTranslation } from "react-i18next";

import { LearnMoreButton } from "../../Assets/ButtonElements";
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./InfoElements";
import teamworkSvg from "../../../images/svg-1.svg"
import cardsSvg from "../../../images/svg-2.svg"
import completeTasksSvg from "../../../images/svg-3.svg"

const InfoSection = ({
  lightBackground,
  id,
  imgStart,
  topLine,
  lightText,
  headLine,
  darkText,
  description,
  buttonLabel,
  img,
  alt,
  primary,
  dark,
  dark2,
}) => {
  //i18next
  const { t } = useTranslation();
  return (
    <>
      <InfoContainer lightBackground={true} id="about">
        <InfoWrapper>
          <InfoRow imgStart={false}>
            <Column1>
              <TextWrapper>
                <TopLine>{t("info_section_topLine1")}</TopLine>
                <Heading lightText={false}>{t("info_section_headLine1")}</Heading>
                <Subtitle darkText={true}>{t("info_section_desc1")}</Subtitle>
                <BtnWrap>
                  <LearnMoreButton
                    to="/learnmore"
                    primary={primary ? 1 : 0} //true or false
                    dark={dark ? 1 : 0}
                    dark2={dark2 ? 1 : 0}
                  >
                    {t("info_section_buttonLabel")}
                  </LearnMoreButton>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={teamworkSvg} alt="teamwork" />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>

      <InfoContainer lightBackground={true} id="discover">
        <InfoWrapper>
          <InfoRow imgStart={true}>
            <Column1>
              <TextWrapper>
                <TopLine>{t("info_section_topLine2")}</TopLine>
                <Heading lightText={false}>{t("info_section_headLine2")}</Heading>
                <Subtitle darkText={true}>{t("info_section_desc2")}</Subtitle>
                <BtnWrap>
                  <LearnMoreButton
                    to="/learnmore"
                    primary={primary ? 1 : 0} //true or false
                    dark={dark ? 1 : 0}
                    dark2={dark2 ? 1 : 0}
                  >
                    {t("info_section_buttonLabel")}
                  </LearnMoreButton>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={cardsSvg} alt="cards" />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>

      <InfoContainer lightBackground={true} id="">
        <InfoWrapper>
          <InfoRow imgStart={false}>
            <Column1>
              <TextWrapper>
                <TopLine>{t("info_section_topLine3")}</TopLine>
                <Heading lightText={false}>{t("info_section_headLine3")}</Heading>
                <Subtitle darkText={true}>{t("info_section_desc3")}</Subtitle>
                <BtnWrap>
                  <LearnMoreButton
                    to="/learnmore"
                    primary={primary ? 1 : 0} //true or false
                    dark={dark ? 1 : 0}
                    dark2={dark2 ? 1 : 0}
                  >
                    {t("info_section_buttonLabel")}
                  </LearnMoreButton>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={completeTasksSvg} alt="complete tasks" />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
