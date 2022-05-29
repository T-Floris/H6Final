import React from "react";
import { useTranslation } from "react-i18next";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Container,
  Title,
  ContactWrapper,
  Contactform,
  ContactInfo,
  TitleH2,
  Text,
  SocialIcons,
  SocialIconLink,
  Line,
  Input,
  Textarea,
  Button,
} from "./ContactFormElements";

const ContactForm = () => {
  
  //i18next
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("contact_us_title")}</Title>
      <ContactWrapper>
        <ContactInfo>
          <TitleH2>{t("contact_us_subtitle1")}</TitleH2>
          <Text>
            <LocationOnIcon style={{ marginRight: "10px" }} />
            TEC telegrafvej 9, 2750 Ballerup
          </Text>
          <Text>
            <PhoneIcon style={{ marginRight: "10px" }} />
            +45 12345678
          </Text>
          <Text>
            <EmailIcon style={{ marginRight: "10px" }} />
            Kanban@kanban.dk
          </Text>
          <Text>
            <b>{t("contact_us_text")}</b>
          </Text>
          <SocialIcons>
            <SocialIconLink
              to="//www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink
              to="//www.youtube.com/"
              target="_blank"
              aria-label="Youtube"
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink
              to="//twitter.com/"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink
              to="//www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              to="//www.linkedin.com/"
              target="_blank"
              aria-label="Linkedin"
            >
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </ContactInfo>
        <Line></Line> {/* line in between to separate */}
        <Contactform>
          <TitleH2>{t("contact_us_subtitle2")}</TitleH2>
          <Input type="text" placeholder={t("contact_us_placeholder1")} required></Input>
          <Input type="email" placeholder={t("contact_us_placeholder2")} required></Input>
          <Textarea placeholder={t("contact_us_placeholder3")} required></Textarea>
          <Button>{t("contact_us_button")}</Button>
          {/* <Message>Thank you for your message.</Message> */}
        </Contactform>
      </ContactWrapper>
    </Container>
  );
};

export default ContactForm;
