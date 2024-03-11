import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ALL_BRI } from "../../Graphql/Queries";
import { DELETE_BRI } from "../../Graphql/Mutations";

function GetAllBri() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_BRI);
  const [message, setMessage] = useState("");
  const [deleteBri, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_BRI, {
      onCompleted: () => {
        // Panggil refetch untuk memperbarui data setelah penghapusan berhasil
        refetch();
      },
    });

  const handleDeleteUser = (briId: number) => {
    // Tampilkan konfirmasi sebelum menghapus
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus pengguna ini?"
    );
    if (confirmed) {
      deleteBri({ variables: { id: briId } })
        .then()
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
    }
  };

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      {data.getAllBris.length === 0 ? (
        <p>No bri data found.</p>
      ) : (
        data.getAllBris.map((briData: any) => (
          <div key={briData.id}>
            <p>ID: {briData.id}</p>
            <button onClick={() => handleDeleteUser(briData.id)}>
              {typeof briData.id}Delete
            </button>
            {deleteError && <p>Error deleting user: {message}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default GetAllBri;
