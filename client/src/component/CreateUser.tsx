import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER } from "../Graphql/Mutations";
import { GET_ALL_USERS } from "../Graphql/Queries";

function CreateUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [updateUser, { error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });

  const handleCreateUser = () => {
    updateUser({ variables: { name, username, password } })
      .then(() => {
        // Tindakan yang perlu dilakukan setelah berhasil membuat pengguna
      })
      .catch((error) => {
        // Tindakan yang perlu dilakukan jika terjadi kesalahan saat membuat pengguna
        console.error("Error creating user:", error);
      });
  };
  return (
    <div className="createUser">
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
      {error && <p>Error creating user: {error.message}</p>}
    </div>
  );
}

export default CreateUser;
