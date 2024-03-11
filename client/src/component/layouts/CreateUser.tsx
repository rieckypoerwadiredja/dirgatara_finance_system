import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER } from "../../Graphql/Mutations";
import { GET_ALL_USERS } from "../../Graphql/Queries";

function CreateUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [createUser, { error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });

  const handleCreateUser = () => {
    createUser({ variables: { name, username, role, password } })
      .then(() => {
        // Tindakan yang perlu dilakukan setelah berhasil membuat pengguna
        setName("");
        setUsername("");
        setPassword("");
        setRole("");
        setMessage("");
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
      });
  };
  return (
    <div className="createUser">
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="role"
        id="role"
        placeholder="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="text"
        name="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
      {error && <p>Error creating user: {message}</p>}
    </div>
  );
}

export default CreateUser;
