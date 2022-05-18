import React from "react";
import { useTranslation } from "react-i18next";

import Image1 from "../../../images/svg-4.svg";
import Image2 from "../../../images/svg-5.svg";
import Image3 from "../../../images/svg-6.svg";
import {
  Container,
  Title,
  ServicesWrapper,
  Card,
  Img,
  SubTitle,
  Text,
} from "./ServicesElements";

const Services = () => {
  //i18next
  const { t } = useTranslation();
  return (
    <Container id="services">
      <Title>{t("services_title")}</Title>
      <ServicesWrapper>
        <Card>
          <Img src={Image1} />
          <SubTitle>{t("services_sub_title1")}</SubTitle>
          <Text>{t("services_text2")}</Text>
        </Card>
        <Card>
          <Img src={Image2} />
          <SubTitle>{t("services_sub_title2")}</SubTitle>
          <Text>{t("services_text3")}</Text>
        </Card>
        <Card>
          <Img src={Image3} />
          <SubTitle>{t("services_sub_title3")}</SubTitle>
          <Text>{t("services_text3")}</Text>
        </Card>
      </ServicesWrapper>
    </Container>
  );
};

export default Services;
