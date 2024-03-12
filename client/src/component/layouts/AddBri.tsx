import React, { useState } from "react";
// GRAPHQL
import { BankBriType } from "../../utils/Type";
import { useMutation } from "@apollo/client";
import { GET_ALL_BRI } from "../../Graphql/Queries";
import { ADD_BRI } from "../../Graphql/Mutations";
// DEFAULT VARIABLE
import { BRI_DEFAULT } from "../../utils/DefaultVariables";
// FORM FIELD
import { POST_BRI_FORM_FIELD } from "../../utils/FormFields";
import Form from "../fragments/Form";

function AddBri() {
  const [addBri, { error }] = useMutation(ADD_BRI, {
    refetchQueries: [{ query: GET_ALL_BRI }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });
  return (
    <form>
      <Form
        sucessAlert
        error={error}
        submit={addBri}
        formFields={POST_BRI_FORM_FIELD}
        defaultVariables={BRI_DEFAULT}
      />
    </form>
  );
}

export default AddBri;
