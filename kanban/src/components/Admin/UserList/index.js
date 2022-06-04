import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "./UserListElements";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("admin/users/get", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data.user);
      } catch (err) {
        console.error(err);

        //state send the user back where they were before, instead of getting dumped back to home page
        //instead of getting sent to the login, it will replaced with the location where they were
        //navigate("/adminlogin", { state: { from: location }, replace: true }); 
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  //ignore this error, it works
  const columns: GridColDef[] = [
    { field: "userName", headerName: "userName", width: 150, editable: true },
    {
      field: "emailAddress",
      headerName: "emailAddress",
      width: 150,
      editable: true,
    },
    { field: "firstName", headerName: "firstName", width: 150, editable: true },
    { field: "lastName", headerName: "lastName", width: 150, editable: true },
    { field: "id", headerName: "id", width: 150 },
    { field: "avatar", headerName: "avatar", width: 150 },
  ];
  return (
    <Container>
      <h2>Users List</h2>
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={users}
          columns={columns}
          
        />
      </div>
      {/* {user.length ? (
          <ul>
            {user.map((user, index) => (
              <li key={index}>
                {user.userName}
                {user.emailAddress}
                {user.firstName}
                {user.id}
                {user.lastName}
                {user.avatar}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )} */}
    </Container>
  );
};

export default UserList;
