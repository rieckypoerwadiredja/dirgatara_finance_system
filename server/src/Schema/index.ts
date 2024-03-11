import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_PASSWORD,
} from "./Mutations/User";
import { GET_ALL_BANK_BRI } from "./Queries/BankBri";
import {
  CREATE_BANK_BRI_MUTATION,
  DELETE_BANK_BRI_MUTATION,
} from "./Mutations/BankBri";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllBris: GET_ALL_BANK_BRI,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: CREATE_USER_MUTATION,
    deleteUser: DELETE_USER_MUTATION,
    updatePassword: UPDATE_USER_PASSWORD,
    addBri: CREATE_BANK_BRI_MUTATION,
    deleteBri: DELETE_BANK_BRI_MUTATION,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
