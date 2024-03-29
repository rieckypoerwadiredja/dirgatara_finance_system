import React from "react";
// Component
import CreateUser from "../component/layouts/CreateUser";
import UpdateUser from "../component/layouts/UpdateUser";
import GetAllUsers from "../component/layouts/GetAllUsers";

function Admin() {
  return (
    <>
      <div className="flex">
        <CreateUser />
        <UpdateUser />
      </div>
      <GetAllUsers />
    </>
  );
}

export default Admin;
