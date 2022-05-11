import React, { useState } from "react";
import i18next from "i18next";
import cookies from "js-cookie";

import {
  Container,
  LanguagesButton,
  Content,
  ContainerItem,
  Item,
  GlobalIcon,
} from "./DropdownElements";

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  //i18next
  const currentLanguageCode = cookies.get("i18next") || "en";

  return (
    <Container>
      <LanguagesButton onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <GlobalIcon />
      </LanguagesButton>
      {isActive && (
        <Content>
          <ContainerItem>
            {languages.map(({ code, name, country_code }) => (
              <Item key={country_code}>
                <button
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code}`}
                    style={{ opacity: code === currentLanguageCode ? 0.5 : 1 }}
                  ></span>
                  {name}
                </button>
              </Item>
            ))}
          </ContainerItem>
        </Content>
      )}
    </Container>
  );
};

const languages = [
  {
    value: "da",
    code: "da",
    name: "Dansk",
    country_code: "dk",
  },
  {
    value: "en",
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    value: "zh",
    code: "zh",
    name: "中文",
    country_code: "cn",
  },
];

export default Dropdown;
