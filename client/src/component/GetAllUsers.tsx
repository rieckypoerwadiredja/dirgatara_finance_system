import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../Graphql/Queries";
import { DELETE_USER } from "../Graphql/Mutations";

function GetAllUsers() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER, {
      onCompleted: () => {
        // Panggil refetch untuk memperbarui data setelah penghapusan berhasil
        refetch();
      },
    });

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {data.getAllUsers.map((userData: any) => (
        <div key={userData.id}>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <button
            onClick={() => deleteUser({ variables: { id: userData.id } })}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>

          {deleteError && <p>Error deleting user: {deleteError.message}</p>}
        </div>
      ))}
    </div>
  );
}

export default GetAllUsers;
