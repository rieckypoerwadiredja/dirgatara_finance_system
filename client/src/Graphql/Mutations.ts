import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $username: String!
    $role: String!
    $password: String!
  ) {
    createUser(
      name: $name
      username: $username
      role: $role
      password: $password
    ) {
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updatePassword(
    $username: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      username: $username
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      sucessfull
      message
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      sucessfull
      message
    }
  }
`;
export const ADD_BRI = gql`
  mutation addBri(
    $noLC: String!
    $noPo: String!
    $suplier: String!
    $program: String!
    $nominal_RP: Float!
    $nominal_USD: Float!
    $nilai_akseptasi_RP: Float!
    $nilai_akseptasi_USD: Float!
    $tanggal_terbit: String!
    $tanggal_expire: String!
    $rating: Int!
  ) {
    addBri(
      noLC: $noLC
      noPo: $noPo
      suplier: $suplier
      program: $program
      nominal_RP: $nominal_RP
      nominal_USD: $nominal_USD
      nilai_akseptasi_RP: $nilai_akseptasi_RP
      nilai_akseptasi_USD: $nilai_akseptasi_USD
      tanggal_terbit: $tanggal_terbit
      tanggal_expire: $tanggal_expire
      rating: $rating
    ) {
      noLC
      noPo
      program
      message {
        sucessfull
        message
      }
    }
  }
`;
export const DELETE_BRI = gql`
  mutation deleteBri($id: Int!) {
    deleteBri(id: $id) {
      message {
        message
        sucessfull
      }
    }
  }
`;
