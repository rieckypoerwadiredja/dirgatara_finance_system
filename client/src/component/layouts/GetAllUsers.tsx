import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../Graphql/Queries";
import { DELETE_USER } from "../../Graphql/Mutations";
import { Button } from "@material-tailwind/react";

function GetAllUsers() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER, {
      onCompleted: () => {
        // Panggil refetch untuk memperbarui data setelah penghapusan berhasil
        refetch();
      },
    });

  const handleDeleteUser = (userId: string) => {
    // Tampilkan konfirmasi sebelum menghapus
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus pengguna ini?"
    );
    if (confirmed) {
      deleteUser({ variables: { id: userId } });
    }
  };

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 p-5">
      {data.getAllUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        data.getAllUsers.map((userData: any) => (
          <div className="p-4 bg-gray-600 w-fit" key={userData.id}>
            <p>Name: {userData.name}</p>
            <p>Username: {userData.username}</p>
            <p>Role: {userData.role}</p>

            <Button
              placeholder=""
              onClick={() => handleDeleteUser(userData.id)}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>

            {deleteError && <p>Error deleting BRI: {deleteError.message}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default GetAllUsers;
