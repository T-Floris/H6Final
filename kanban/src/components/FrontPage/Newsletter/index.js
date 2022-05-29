import React from "react";
import { useTranslation } from "react-i18next";
import { Send } from "@material-ui/icons";
import {
  Container,
  Title,
  Desc,
  InputContainer,
  Input,
  Button,
} from "./NewsletterElements";

const Newsletter = () => {
  //i18next
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("newsletter")}</Title>
      <Desc>
      {t("newsletter_decs")}
      </Desc>
      <InputContainer>
        <Input placeholder={t("placeholder")} required />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
