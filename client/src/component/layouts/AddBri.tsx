import React, { useState } from "react";
import { BankBriType } from "../../utils/Type";
import { useMutation } from "@apollo/client";
import { GET_ALL_BRI } from "../../Graphql/Queries";
import { ADD_BRI } from "../../Graphql/Mutations";

function AddBri() {
  const [form, setForm] = useState<BankBriType>({
    noLC: "",
    noPo: "",
    suplier: "",
    program: "",
    nominal_RP: 0,
    nominal_USD: 0,
    nilai_akseptasi_RP: 0,
    nilai_akseptasi_USD: 0,
    tanggal_terbit: "",
    tanggal_expire: "",
    rating: 0, // Nilai default untuk rating
  });
  const [message, setMessage] = useState("");

  const [addBri, { error }] = useMutation(ADD_BRI, {
    refetchQueries: [{ query: GET_ALL_BRI }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });
  const handleAddBri = (e: any) => {
    e.preventDefault();
    addBri({
      variables: {
        noLC: form.noLC,
        noPo: form.noPo,
        suplier: form.suplier,
        program: form.program,
        nominal_RP: form.nominal_RP,
        nominal_USD: form.nominal_USD,
        nilai_akseptasi_RP: form.nilai_akseptasi_RP,
        nilai_akseptasi_USD: form.nilai_akseptasi_USD,
        tanggal_terbit: form.tanggal_terbit,
        tanggal_expire: form.tanggal_expire,
        rating: form.rating,
      },
    })
      .then(() => {
        // Tindakan yang perlu dilakukan setelah berhasil membuat pengguna
        setForm({
          noLC: "",
          noPo: "",
          suplier: "",
          program: "",
          nominal_RP: 0,
          nominal_USD: 0,
          nilai_akseptasi_RP: 0,
          nilai_akseptasi_USD: 0,
          tanggal_terbit: "",
          tanggal_expire: "",
          rating: 0, // Nilai default untuk rating
        });
      })
      .catch((err) => {
        if (err.networkError) {
          // Tangani kesalahan jaringan (misalnya, koneksi ke server terputus)
          setMessage(err.networkError.result.errors[0].message);
        } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
          // Tangani kesalahan dari server GraphQL
          setMessage(err.graphQLErrors[0].message);
        } else {
          // Tangani kesalahan lainnya
          console.error("Error creating user:", err);
          setMessage("An unexpected error occurred.");
        }
        console.log(message);
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const fieldType = formFields.find((field) => field.name === name)?.type; // Dapatkan tipe field berdasarkan namanya
    const parsedValue = fieldType === "number" ? parseFloat(value) : value; // Mengonversi nilai ke number jika tipe field adalah number
    setForm({ ...form, [name]: parsedValue });
  };

  const formFields = [
    { label: "LC Number", name: "noLC", type: "text" },
    { label: "PO Number", name: "noPo", type: "text" },
    { label: "Supplier", name: "suplier", type: "text" },
    { label: "Program", name: "program", type: "text" },
    { label: "Nominal (RP)", name: "nominal_RP", type: "number" },
    { label: "Nominal (USD)", name: "nominal_USD", type: "number" },
    {
      label: "Nilai Akseptasi (RP)",
      name: "nilai_akseptasi_RP",
      type: "number",
    },
    {
      label: "Nilai Akseptasi (USD)",
      name: "nilai_akseptasi_USD",
      type: "number",
    },
    { label: "Tanggal Terbit", name: "tanggal_terbit", type: "date" },
    { label: "Tanggal Expire", name: "tanggal_expire", type: "date" },
    { label: "Rating", name: "rating", type: "number" },
  ];
  return (
    <form>
      {formFields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <p>{error && message}</p>
      <button onClick={(e) => handleAddBri(e)}>Submit</button>
    </form>
  );
}

export default AddBri;
