import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "./UserListElements";
import useRefreshToken from "../../../hooks/useRefreshToken";

const UserList = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("admin/users/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        // console.error(err);
        // navigate("/adminlogin", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container>
      <article>
        <h2>Users List</h2>
        {users?.length ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user?.id}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
        <button onClick={() => refresh()}>Refresh</button>
      </article>
    </Container>
  );
};

export default UserList;
