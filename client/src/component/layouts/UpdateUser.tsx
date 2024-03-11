import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_USER } from "../../Graphql/Mutations";
import { GET_ALL_USERS } from "../../Graphql/Queries";

function UpdateUser() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateUser, { error, data }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }], // Menggunakan refetchQueries untuk memperbarui data setelah mutasi selesai
  });

  const handleUpdateUser = () => {
    updateUser({ variables: { username, oldPassword, newPassword } })
      .then(() => {
        setUsername("");
        setOldPassword("");
        setNewPassword("");
        alert("Password Berhasil diganti");
        // Tindakan yang perlu dilakukan setelah berhasil membuat pengguna
      })
      .catch((error) => {
        // Tindakan yang perlu dilakukan jika terjadi kesalahan saat membuat pengguna
        console.error("Error creating user:", error);
      });
  };
  return (
    <div className="createUser">
      <h1>Update User</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="oldPassword"
        id="oldPassword"
        value={oldPassword}
        placeholder="oldPassword"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="text"
        name="newPassword"
        id="newPassword"
        value={newPassword}
        placeholder="newpassword"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleUpdateUser}>Create User</button>
      {error && <p>Error creating user: {error.message}</p>}
      {data && data.updateUser && <p>Success: {data.updateUser.message}</p>}
    </div>
  );
}

export default UpdateUser;
