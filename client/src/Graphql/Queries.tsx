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

export const GET_ALL_BG = gql`
  query getAllBGs {
    getAllBGs {
      id
      noRef
      pekerjaan
      tipe
      program
      kode_program
      vauta_asli
      jenis_vauta_asli
      tgl_terbit
      tgl_berlaku
      tgl_jatuh_tempo
      bank
      deposito_giro
      jenis
      norek
      tgl_pembukuan
    }
  }
`;
