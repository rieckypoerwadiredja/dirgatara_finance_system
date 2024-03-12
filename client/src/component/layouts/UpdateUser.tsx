import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_USER } from "../../Graphql/Mutations";
import { GET_ALL_USERS } from "../../Graphql/Queries";
import { UPDATE_USER_DEFAULT } from "../../utils/DefaultVariables";
import Form from "../fragments/Form";
import { UPDATE_USER_FORM_FIELD } from "../../utils/FormFields";

function UpdateUser() {
  const [updateUser, { error, data }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  return (
    <div className="updateUser">
      <h1>Update User</h1>
      <Form
        sucessAlert
        error={error}
        submit={updateUser}
        formFields={UPDATE_USER_FORM_FIELD}
        defaultVariables={UPDATE_USER_DEFAULT}
      />
      {/* {data && data.updateUser && <p>Success: {data.updateUser.message}</p>} */}
    </div>
  );
}

export default UpdateUser;
