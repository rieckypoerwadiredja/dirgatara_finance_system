import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { MessageType } from "./Message";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const UserMessageType = new GraphQLObjectType({
  name: "UserMessage",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    message: { type: MessageType },
  }),
});
