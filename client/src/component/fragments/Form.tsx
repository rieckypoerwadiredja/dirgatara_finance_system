import React, { useState } from "react";
import Select from "../elements/Select";
import { Input } from "@material-tailwind/react";
import { useMutation } from "@apollo/client";

interface FormProps {
  formFields: Array<any>;
  defaultVariables: Record<string, any>;
  error: boolean | Error | undefined; // Specify the type for error
  submit: (form: Record<string, any>) => Promise<any>; // Specify the type for submit
  sucessAlert: boolean;
}

function Form(props: FormProps) {
  const {
    formFields,
    defaultVariables,
    error,
    submit,
    sucessAlert = false,
  } = props; // Destructure submit from props
  const [form, setForm] = useState<Record<string, any>>(defaultVariables);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const fieldType = formFields.find((field) => field.name === name)?.type; // Dapatkan tipe field berdasarkan namanya
    const parsedValue = fieldType === "number" ? parseFloat(value) : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    submit({ variables: { ...form } })
      .then(() => {
        setForm(defaultVariables);
        setMessage("");
        if (sucessAlert) alert("success");
      })
      .catch((err) => {
        if (err.networkError) {
          setMessage(err.networkError.result.errors[0].message);
        } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
          setMessage(err.graphQLErrors[0].message);
        } else {
          console.error("Error submitting form:", err);
          setMessage("An unexpected error occurred.");
          if (sucessAlert) alert(message);
        }
      });
  };

  return (
    <div>
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          {field.type === "select" ? (
            <Select
              name={field.name}
              value={form[field.name].toString()}
              onChange={handleInputChange}
              options={field.options || []}
            />
          ) : (
            <Input
              type={field.type}
              name={field.name}
              id={field.name}
              label={field.label}
              value={form[field.name]}
              crossOrigin=""
              onChange={handleInputChange}
            />
          )}
        </React.Fragment>
      ))}
      <button onClick={(e) => handleFormSubmit(e)}>Submit</button>
      {error && <p>Error submitting form: {message}</p>}
    </div>
  );
}

export default Form;
