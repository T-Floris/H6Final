import { React } from "react";
import { useTranslation } from "react-i18next";

import {
  Container,
  Title,
  Wrapper,
  PlanTitle,
  ToggleSwitch,
  Toggler,
  Cards,
  Card,
  CardTitle,
  CardPrice,
  CardDesc,
  CardPlan,
  CardButton,
} from "./PricingTableElements";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const PricingTable = () => {
  //i18next
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("pricingtable_title")}</Title>
      <Wrapper>
        <PlanTitle>{t("pricingtable_planTitle")}</PlanTitle>
        <ToggleSwitch>
          <span>{t("pricingtable_toggleText1")}</span>
          <Toggler type="checkbox" />
          <span>{t("pricingtable_toggleText2")}</span>
        </ToggleSwitch>

        <Cards>
          <Card>
            <CardTitle>{t("pricingtable_cardTitle1")}</CardTitle>
            <CardPrice>
              {" "}
              {t("pricingtable_cardPrice1")}{" "}
              <span> {t("pricingtable_cardMonth")}</span>{" "}
            </CardPrice>
            <CardDesc>{t("pricingtable_cardDesc1")}</CardDesc>
            <CardPlan>
              <li>{t("pricingtable_cardPlan1")}</li>
              <li>{t("pricingtable_cardPlan2")}</li>
              <li>{t("pricingtable_cardPlan3")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
            </CardPlan>
            <CardButton type="button">
              {t("pricingtable_cardButton1")}
            </CardButton>
          </Card>

          <Card>
            <CardTitle>{t("pricingtable_cardTitle2")}</CardTitle>
            <CardPrice>
              {" "}
              {t("pricingtable_cardPrice2")}{" "}
              <span> {t("pricingtable_cardMonth")}</span>{" "}
            </CardPrice>
            <CardDesc>{t("pricingtable_cardDesc2")}</CardDesc>
            <CardPlan>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
            </CardPlan>
            <CardButton type="button">
              {t("pricingtable_cardButton2")}
            </CardButton>
          </Card>
          <Card>
            <CardTitle>{t("pricingtable_cardTitle3")}</CardTitle>
            <CardPrice>
              {" "}
              {t("pricingtable_cardPrice3")}{" "}
              <span> {t("pricingtable_cardMonth")}</span>{" "}
            </CardPrice>
            <CardDesc>{t("pricingtable_cardDesc3")}</CardDesc>
            <CardPlan>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
            </CardPlan>
            <CardButton type="button">
              {t("pricingtable_cardButton2")}
            </CardButton>
          </Card>

          <Card>
            <CardTitle>{t("pricingtable_cardTitle4")}</CardTitle>
            <CardPrice>{t("pricingtable_cardPrice4")}</CardPrice>
            <CardDesc>{t("pricingtable_cardDesc4")}</CardDesc>
            <CardPlan>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
              <li>{t("pricingtable_cardPlanComingSoon")}</li>
            </CardPlan>
            <CardButton type="button">
              {t("pricingtable_cardButton3")}
            </CardButton>
          </Card>
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default PricingTable;
