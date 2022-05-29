import React from "react";
import {
  Container,
  Title,
  Text,
  Form,
  EmailInput,
  SubmitButton,
  UnsubscribeButton,
} from "./EmailElements";

const Email = () => {
  return (
    <Container>
      <Title>Change your email</Title>

      <Form>
        <Text>Your current email address is Username@hotmail.com</Text>
        <EmailInput
          type="email"
          placeholder="Enter new email address"
          required
        ></EmailInput>

        <SubmitButton type="submit" value="Submit">
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
