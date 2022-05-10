import React, { useState } from "react";
import { useTranslation } from "react-i18next";


import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMediaWrap,
  SoicalLogo,
  SocialIcons,
  SocialIconLink,
  WebsiteRights,

} from "./FooterElements";

import Dropdown from "../../Assets/Dropdown";

const Footer = () => {
  //scrolls back to top when clicked
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  //i18next
  const { t } = useTranslation();

  const aboutUsArray = t("about_us_array", { returnObjects: true });
  const explore_array = t("explore_array", { returnObjects: true });
  const follow_us_at_array = t("follow_us_at_array", { returnObjects: true });
  const help_array = t("help_array", { returnObjects: true });

  const [selected, setSelected] = useState();

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>{t("about_us_title")}</FooterLinkTitle>
              {aboutUsArray.map((aboutUs) => (
                <FooterLink key={aboutUs.label} to={aboutUs.to}>
                  {aboutUs.label}
                </FooterLink>
              ))}
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>{t("explore_title")}</FooterLinkTitle>
              {explore_array.map((aboutUs) => (
                <FooterLink key={aboutUs.label} to={aboutUs.to}>
                  {aboutUs.label}
                </FooterLink>
              ))}
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>{t("follow_us_at_title")}</FooterLinkTitle>
              {follow_us_at_array.map((aboutUs) => (
                <FooterLink key={aboutUs.label} to={aboutUs.to}>
                  {aboutUs.label}
                </FooterLink>
              ))}
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>{t("help_title")}</FooterLinkTitle>
              {help_array.map((aboutUs) => (
                <FooterLink key={aboutUs.label} to={aboutUs.to}>
                  {aboutUs.label}
                </FooterLink>
              ))}
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <Dropdown selected={selected} setSelected={setSelected} />
        <SocialMediaWrap>
          <SoicalLogo to="/" onClick={toggleHome}>
            {t("kanban")}
          </SoicalLogo>
          <WebsiteRights>
            {t("kanban")} &copy; {new Date().getFullYear()} {t("rights")}
          </WebsiteRights>
          <SocialIcons>
            {SocialMediaLinksArray.map(({ label, to, icon }) => (
              <SocialIconLink
                key={label}
                to={to}
                target="_blank"
                aria-label={label}
              >
                {icon}
              </SocialIconLink>
            ))}
          </SocialIcons>
        </SocialMediaWrap>
      </FooterWrap>

      

    </FooterContainer>
  );
};


const SocialMediaLinksArray = [
  {
    label: "Facebook",
    to: "//www.facebook.com/",
    icon: <FaFacebook />,
  },
  {
    label: "Youtube",
    to: "//www.youtube.com/",
    icon: <FaYoutube />,
  },
  {
    label: "Twitter",
    to: "//twitter.com/",
    icon: <FaTwitter />,
  },
  {
    label: "Instagram",
    to: "//www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    label: "Linkedin",
    to: "//www.linkedin.com/",
    icon: <FaLinkedin />,
  },
];

export default Footer;
