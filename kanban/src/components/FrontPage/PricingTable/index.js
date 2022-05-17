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
      <Title>Pricing</Title>
      <Wrapper>
        <PlanTitle>Choose a plan</PlanTitle>
        <ToggleSwitch>
          <span>Billed annually</span>
          <Toggler type="checkbox" />
          <span>Billed monthly</span>
        </ToggleSwitch>

        <Cards>
          <Card>
            <CardTitle>FREE</CardTitle>
            <CardPrice>
              {" "}
              $0USD <span> / month</span>{" "}
            </CardPrice>
            <CardDesc>
              For individuals or teams looking to organize anything.
            </CardDesc>
            <CardPlan>
              <li>Up to 10 boards per Workspace</li>
              <li>Unlimited cards</li>
              <li>Email Support</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
            </CardPlan>
            <CardButton type="button">Get Started</CardButton>
          </Card>

          <Card>
            <CardTitle>STANDARD</CardTitle>
            <CardPrice>
              {" "}
              $5USD <span> / month</span>{" "}
            </CardPrice>
            <CardDesc>
              For teams that need to manage more work and scale collaboration.
            </CardDesc>
            <CardPlan>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
            </CardPlan>
            <CardButton type="button"> Choose Plan</CardButton>
          </Card>
          <Card>
            <CardTitle>PREMIUM</CardTitle>
            <CardPrice>
              {" "}
              $10USD <span> / month</span>{" "}
            </CardPrice>
            <CardDesc>
              Best for teams up to 100 that need to track multiple projects and
              visualize work in a variety of ways.
            </CardDesc>
            <CardPlan>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
            </CardPlan>
            <CardButton type="button"> Choose Plan</CardButton>
          </Card>

          <Card>
            <CardTitle>Enterprise</CardTitle>
            <CardPrice>Let's Talk !</CardPrice>
            <CardDesc>
              For organizations that need to connect work across teams with more
              security and controls.
            </CardDesc>
            <CardPlan>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
              <li>Coming soon</li>
            </CardPlan>
            <CardButton type="button">Contact Us</CardButton>
          </Card>
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default PricingTable;
