import React from "react";
import { Container, DeleteButton } from "./DeleteAccountElements";

const DeleteAccount = () => {
  // const DELETE_URL = "Auth/Delete";
  // const ToDelete = true;
  // const handleRowDelete = async (oldData, resolve) => {
  //   axiosPrivate.delete("auth/delete",{
  //     data: {
  //       "ToDelete" : ToDelete
  //   },
  //   headers:
  //   {
  //     "Content-Type": "application/json",
  //     withCredentials: true,
  //   }
  //   })
  //   .then(res => {
  //     const dataDelete = [...data];
  //     const index = oldData.tableData.id;
  //     dataDelete.splice(index, 1);
  //     setData([...dataDelete]);
  //     resolve()
  //     console.log(res)
  //   })
  //   .catch(error => {
  //     setErrorMessages(["Delete failed! Server error"])
  //     setIserror(true)
      
  //     resolve()
  //     console.log(error)
  //   })
  // };
  return (
    <Container>
      <DeleteButton>Delete account</DeleteButton>
    </Container>
  );
};

export default DeleteAccount;
