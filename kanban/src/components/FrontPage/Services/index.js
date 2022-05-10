import React from "react";
import { useTranslation } from "react-i18next";

import Image1 from "../../../images/svg-4.svg";
import Image2 from "../../../images/svg-5.svg";
import Image3 from "../../../images/svg-6.svg";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  //i18next
  const { t } = useTranslation();
  return (
    <ServicesContainer id="services">
      <ServicesH1>{t("services_title")}</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Image1} />
          <ServicesH2>{t("services_sub_title1")}</ServicesH2>
          <ServicesP>{t("services_text2")}</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Image2} />
          <ServicesH2>{t("services_sub_title2")}</ServicesH2>
          <ServicesP>{t("services_text3")}</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Image3} />
          <ServicesH2>{t("services_sub_title3")}</ServicesH2>
          <ServicesP>{t("services_text3")}</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
