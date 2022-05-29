import { useTranslation } from "react-i18next";

import { Container, Text } from "./AnnouncementElements";

const Announcement = () => {

  //i18next
  const { t } = useTranslation();
  
  return (
    <Container>
      <Text>{t("announcement_text")}</Text>
    </Container>
  );
};

export default Announcement;
