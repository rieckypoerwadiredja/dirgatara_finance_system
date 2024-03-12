import React from "react";
// GRAPHQL
import { CREATE_USER } from "../../Graphql/Mutations";
import { GET_ALL_USERS } from "../../Graphql/Queries";
// FORM FIELD
import { POST_USER_FORM_FIELD } from "../../utils/FormFields";
// DEFAULT VALUE
import { CREATE_USER_DEFAULT } from "../../utils/DefaultVariables";
import Form from "../fragments/Form";
import { useMutation } from "@apollo/client";

function CreateUser() {
  const [createUser, { error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  return (
    <div className="createUser">
      <Form
        sucessAlert
        error={error}
        submit={createUser}
        formFields={POST_USER_FORM_FIELD}
        defaultVariables={CREATE_USER_DEFAULT}
      />
    </div>
  );
}

export default CreateUser;
