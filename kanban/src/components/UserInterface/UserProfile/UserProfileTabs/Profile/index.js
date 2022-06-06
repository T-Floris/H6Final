import React, { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  Container,
  Form,
  TextLabel,
  Title,
  TextInput,
  EditField,
} from "./ProfileElements";

const EditableInput = (e) => {
  e.preventDefault();
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
      <Title>About you</Title>
      <Form>
        <TextLabel>Firstname</TextLabel>
        <p>{user.firstName}</p>
        <EditableInput />
        <TextLabel>Lastname</TextLabel>
        <p>{user.lastName}</p>
        <EditableInput />

        <TextLabel>Username</TextLabel>
        <p>{user.userName}</p>
        <EditableInput />
      </Form>
    </Container>
  );
};

export default Profile;
