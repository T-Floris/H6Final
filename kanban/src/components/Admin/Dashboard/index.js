import React from "react";
import { Container, Text, Title, Wrapper } from "./DashboardElements";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";

const Dashboard = () => {
  //i18next
  const { t } = useTranslation();

  //Welcome message for user
  const date = new Date();
  const hours = date.getHours();
  let message;

  if (hours < 12) {
    message = t("userstart_morning");
  } else if (hours < 18) {
    message = t("userstart_afternoon");
  } else {
    message = t("userstart_evening");
  }

  const [admin, setAdmin] = useState({
    userName: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    id: "",
  });
  // const navigate = useNavigate();
  // const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAdmin = async () => {
      try {
        const response = await axiosPrivate.get("user", {
          signal: controller.signal,
        });
        //console.log(response.data);
        isMounted && setAdmin(response.data);
      } catch (err) {
        // console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getAdmin();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container>
      <PageBar>
        <Title>Admin Dashboard</Title>
      </PageBar>
      <Wrapper>
        <Text>{message} {admin.userName}</Text>

      </Wrapper>
    </Container>
  );
};

export default Dashboard;
