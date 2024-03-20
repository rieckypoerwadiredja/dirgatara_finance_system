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

export const ADD_BG = gql`
  mutation addBG(
    $noRef: String!
    $pekerjaan: String!
    $tipe: String!
    $program: String!
    $kode_program: String!
    $vauta_asli: Int!
    $jenis_vauta_asli: String!
    $tgl_terbit: String!
    $tgl_berlaku: String!
    $tgl_jatuh_tempo: String!
    $bank: String!
    $deposito_giro: Int!
    $jenis: String!
    $norek: String!
    $tgl_pembukuan: String!
  ) {
    addBG(
      noRef: $noRef
      pekerjaan: $pekerjaan
      tipe: $tipe
      program: $program
      kode_program: $kode_program
      vauta_asli: $vauta_asli
      jenis_vauta_asli: $jenis_vauta_asli
      tgl_terbit: $tgl_terbit
      tgl_berlaku: $tgl_berlaku
      tgl_jatuh_tempo: $tgl_jatuh_tempo
      bank: $bank
      deposito_giro: $deposito_giro
      jenis: $jenis
      norek: $norek
      tgl_pembukuan: $tgl_pembukuan
    ) {
      noRef
      program
      message {
        sucessfull
        message
      }
    }
  }
`;

export const DELETE_BRI = gql`
  mutation deleteBG($id: Int!) {
    deleteBG(id: $id) {
      message {
        message
        sucessfull
      }
    }
  }
`;
