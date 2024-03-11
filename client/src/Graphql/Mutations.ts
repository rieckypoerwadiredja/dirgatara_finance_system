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
