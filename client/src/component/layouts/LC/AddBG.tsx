import React, { useState } from "react";
// GRAPHQL
import { BankBriType } from "../../../utils/Type";
import { useMutation } from "@apollo/client";
import { GET_ALL_BG } from "../../../Graphql/Queries";
import { ADD_BG } from "../../../Graphql/Mutations";
// DEFAULT VARIABLE
import { BG_DEFAULT } from "../../../utils/DefaultVariables";
// FORM FIELD
import { POST_BG_FORM_FIELD } from "../../../utils/FormFields";
import Form from "../../fragments/Form";

function AddBG() {
  const [addBG, { error }] = useMutation(ADD_BG, {
    refetchQueries: [{ query: GET_ALL_BG }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });
  return (
    <form>
      <Form
        title="Add BRI BG"
        sucessAlert
        error={error}
        submit={addBG}
        formFields={POST_BG_FORM_FIELD}
        defaultVariables={BG_DEFAULT}
      />
    </form>
  );
}

export default AddBG;
