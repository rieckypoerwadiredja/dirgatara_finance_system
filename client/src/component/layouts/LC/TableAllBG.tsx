import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ALL_BG } from "../../../Graphql/Queries";
import { DELETE_BRI } from "../../../Graphql/Mutations";
import { IconButton } from "@material-tailwind/react";
import { CiTrash } from "react-icons/ci";
function TableAllBG() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_BG);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [deleteBri, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_BRI, {
      onCompleted: () => {
        // Panggil refetch untuk memperbarui data setelah penghapusan berhasil
        refetch();
      },
    });
  const getStatus = (tglBerlaku: string, tglJatuhTempo: string): string => {
    const now = new Date();
    const tglBerlakuDate = new Date(tglBerlaku);
    const tglJatuhTempoDate = new Date(tglJatuhTempo);

    const differenceTimeBerlaku = tglBerlakuDate.getTime() - now.getTime();
    const differenceDaysBerlaku = differenceTimeBerlaku / (1000 * 3600 * 24); // Milliseconds to days

    const differenceTimeJatuhTempo =
      tglJatuhTempoDate.getTime() - now.getTime();
    const differenceDaysJatuhTempo =
      differenceTimeJatuhTempo / (1000 * 3600 * 24); // Milliseconds to days

    if (differenceDaysJatuhTempo <= 60) {
      return "Warn 60 days left";
    } else if (differenceDaysJatuhTempo <= 30) {
      return "Warn less than 60 days";
    } else if (differenceDaysBerlaku <= 0) {
      return "Expire";
    } else {
      return "Active";
    }
  };

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

  const filteredData = data?.getAllBGs.filter((program: any) => {
    const status = getStatus(program.tgl_berlaku, program.tgl_jatuh_tempo);
    const filterStatusMatch = !filterStatus || status === filterStatus;
    const filterTypeMatch = !filterType || program.tipe === filterType;
    return filterStatusMatch && filterTypeMatch;
  });

  return (
    <>
      <div className="flex items-center">
        <select
          className="border-2 mr-2"
          value={filterStatus || ""}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Warn 60 days left">Warn 60 days left</option>
          <option value="Warn less than 60 days">Warn less than 60 days</option>
          <option value="Expire">Expire</option>
          <option value="Active">Active</option>
        </select>
        <select
          className="border-2 mr-2"
          value={filterType || ""}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Jaminan Penawaran">Jaminan Penawaran</option>
          <option value="Jaminan Pelaksanaan">Jaminan Pelaksanaan</option>
          <option value="Jaminan Uang Muka">Jaminan Uang Muka</option>
          <option value="Jaminan Pemeliharaan">Jaminan Pemeliharaan</option>
        </select>
      </div>

      <table className="w-full table-fixed">
        {/* Table Headers */}
        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
          <tr>
            <th scope="col" className="px-6 py-4 border-2">
              No Ref
            </th>
            <th scope="col" className="px-6 py-4 border-2">
              Pekerjaan
            </th>
            <th scope="col" className="px-6 py-4 border-2">
              Program
            </th>
            <th scope="col" className="px-6 py-4 border-2">
              Jenis
            </th>
            <th scope="col" className="px-6 py-4 border-2">
              Status
            </th>
            <th scope="col" className="px-6 py-4 border-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-neutral-200 font-medium dark:border-white/10">
          {/* Table Rows */}
          {filteredData.length < 1 ? (
            <p>Tidak ada datanya</p>
          ) : (
            filteredData.map((program: any) => (
              <tr
                className="border-b border-neutral-200 dark:border-white/10"
                key={program.id}
              >
                <td className="px-6 py-4 border-2 overflow-hidden">
                  <span className="max-w-full !whitespace-pre-wrap">
                    {program.noRef}
                  </span>
                </td>
                {/* Add other table cells here */}
                <td className="px-6 py-4 border-2 overflow-hidden">
                  <span className="max-w-full !whitespace-pre-wrap">
                    {program.pekerjaan}
                  </span>
                </td>
                <td className="px-6 py-4 border-2 overflow-hidden">
                  <span className="max-w-full !whitespace-pre-wrap">
                    {program.program}
                  </span>
                </td>
                <td className="px-6 py-4 border-2 overflow-hidden">
                  {program.jenis}
                </td>
                <td className="px-6 py-4 border-2 overflow-hidden">
                  {getStatus(program.tgl_berlaku, program.tgl_jatuh_tempo)}
                </td>
                <td className="px-6 py-4 border-2 overflow-hidden">
                  <IconButton
                    placeholder=""
                    className="bg-transparent"
                    onClick={() => handleDeleteUser(program.id)}
                  >
                    <CiTrash className="text-red-600 text-3xl" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableAllBG;
