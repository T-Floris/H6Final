import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  Container,
  Title,
  Text,
  Span,
  Form,
  EmailInput,
  SubmitButton,
  UnsubscribeButton,
} from "./EmailElements";
const USER_URL = "user";

const Email = () => {
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
        //console.log(response.data);
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

  const [EmailAddress, setEmailAddress] = useState("");
  const UPDATEEMAIL_URL = "auth/changeemail";
  const handleSubmit = async () => {
    try {
      await axiosPrivate.post(
        UPDATEEMAIL_URL,
        JSON.stringify({ NewEmailAddress: EmailAddress })
      );

      setEmailAddress("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>Change your email</Title>

      <Form>
        <Text>Your current email address is {user.emailAddress}</Text>
        <EmailInput
          type="email"
          placeholder="Enter new email address"
          value={EmailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          autoFocus
          required
        ></EmailInput>

        <SubmitButton type="submit" value="Submit" onSubmit={handleSubmit}>
          Save changes
        </SubmitButton>
        <UnsubscribeButton type="button">
          Unsubscribe to newsletter
        </UnsubscribeButton>
      </Form>
    </Container>
  );
};

export default Email;
