import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_PASSWORD,
} from "./Mutations/User";
import { GET_ALL_BANK_BG } from "./Queries/BankBG";
import {
  CREATE_BANK_BG_MUTATION,
  DELETE_BANK_BG_MUTATION,
  UPDATE_BANK_BG_MUTATION,
} from "./Mutations/BankBG";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllBGs: GET_ALL_BANK_BG,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: CREATE_USER_MUTATION,
    deleteUser: DELETE_USER_MUTATION,
    updatePassword: UPDATE_USER_PASSWORD,
    addBG: CREATE_BANK_BG_MUTATION,
    updateBG: UPDATE_BANK_BG_MUTATION,
    deleteBG: DELETE_BANK_BG_MUTATION,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
