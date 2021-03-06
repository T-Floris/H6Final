import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import { Container } from "./UserList-v2Elements";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


const UserListV2 = () => {
  const axiosPrivate = useAxiosPrivate();

  var columns = [
    { title: "id", field: "id", hidden: true },
    {
      title: "Avatar",
      render: (rowData) => (
        <Avatar
          maxInitials={1}
          size={40}
          round={true}
          name={rowData === undefined ? " " : rowData.firstName}
        />
      ),
    },
    { title: "First name", field: "firstName" },
    { title: "Last name", field: "lastName" },
    { title: "Email", field: "emailAddress" },
    { title: "Username", field: "userName" },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("admin/users/get", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setData(response.data.user);
      } catch (err) {
        // console.error(err);

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

  const UPDATE_URL = "admin/update/user/";
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === "") {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === "") {
      errorList.push("Please enter last name");
    }
    if (newData.email === "") {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      axiosPrivate
        .put(UPDATE_URL + newData.id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  // const handleRowAdd = (newData, resolve) => {
  //   //validation
  //   let errorList = [];
  //   if (newData.first_name === undefined) {
  //     errorList.push("Please enter first name");
  //   }
  //   if (newData.last_name === undefined) {
  //     errorList.push("Please enter last name");
  //   }
  //   if (newData.email === undefined) {
  //     errorList.push("Please enter a valid email");
  //   }

  //   if (errorList.length < 1) {
  //     //no error
  //     axios
  //       .post("auth/register", newData)
  //       .then((res) => {
  //         let dataToAdd = [...data];
  //         dataToAdd.push(newData);
  //         setData(dataToAdd);
  //         resolve();
  //         setErrorMessages([]);
  //         setIserror(false);
  //       })
  //       .catch((error) => {
  //         setErrorMessages(["Cannot add data. Server error!"]);
  //         setIserror(true);
  //         resolve();
  //       });
  //   } else {
  //     setErrorMessages(errorList);
  //     setIserror(true);
  //     resolve();
  //   }
  // };
  
  const DELETE_URL = "admin/delete/user/";
  const ToDelete = true;
  const handleRowDelete = async (oldData, resolve) => {
    axiosPrivate
      .delete(DELETE_URL + oldData.id, {
        data: {
          ToDelete: ToDelete,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        // console.log(res);
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);

        resolve();
        // console.log(error);
      });
  };

  return (
    <Container>
      <div>
        {iserror && (
          <Alert severity="error">
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>
      <MaterialTable
        title="User data"
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          // onRowAdd: (newData) =>
          //   new Promise((resolve) => {
          //     handleRowAdd(newData, resolve);
          //   }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
    </Container>
  );
};

export default UserListV2;
