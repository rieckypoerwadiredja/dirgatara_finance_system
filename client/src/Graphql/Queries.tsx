import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      id
      name
      username
      role
    }
  }
`;

export const GET_ALL_BRI = gql`
  {
    getAllBris {
      id
      noPo
      suplier
      program
      nominal_RP
      nominal_USD
      nilai_akseptasi_RP
      nilai_akseptasi_USD
      tanggal_terbit
      tanggal_expire
      rating
    }
  }
`;
