import React from "react";
import { Container, Title, Text, Wrapper } from "./StartElements";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
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

  const [user, setUser] = useState({
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

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("user", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUser(response.data);
      } catch (err) {
        // console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container>
      <PageBar>
        <Title>Home Page</Title>
      </PageBar>
      <Wrapper>
        <Text>{message} {user.userName}</Text>

      </Wrapper>
    </Container>
  );
};

export default Home;
