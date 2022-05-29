import React, { useState } from "react";
import {
  Container,
  Form,
  TextLabel,
  Title,
  TextInput,
  EditField,
} from "./ProfileElements";

const EditableInput = () => {
  const [Value, setValue] = useState("");
  const [EditMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!EditMode);
  return (
    <>
      {EditMode ? (
        <TextInput
          autoFocus
          type="text"
          value={Value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={toggleEditMode}
        />
      ) : (
        <EditField onClick={toggleEditMode}>{Value}</EditField>
      )}
    </>
  );
};

const Profile = () => {
  return (
    <Container>
      <Title>About you</Title>
      <Form>
        <TextLabel>Full name</TextLabel>
        <EditableInput />

        <TextLabel>Public name</TextLabel>
        <EditableInput />

        <TextLabel>Job title</TextLabel>
        <EditableInput />

        <TextLabel>Department</TextLabel>
        <EditableInput />

        <TextLabel>Organization</TextLabel>
        <EditableInput />
      </Form>
    </Container>
  );
};

export default Profile;
