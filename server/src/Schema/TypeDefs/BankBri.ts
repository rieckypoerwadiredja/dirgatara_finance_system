import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";
import { MessageType } from "./Message";

export const BankBriType = new GraphQLObjectType({
  name: "Bri",
  fields: () => ({
    id: { type: GraphQLInt },
    noLC: { type: GraphQLString },
    noPo: { type: GraphQLString },
    suplier: { type: GraphQLString },
    program: { type: GraphQLString },
    nominal_RP: { type: GraphQLFloat },
    nominal_USD: { type: GraphQLFloat },
    nilai_akseptasi_RP: { type: GraphQLFloat },
    nilai_akseptasi_USD: { type: GraphQLFloat },
    tanggal_terbit: { type: GraphQLString },
    tanggal_expire: { type: GraphQLString },
    rating: { type: GraphQLString },
  }),
});

export const BankBriMessageType = new GraphQLObjectType({
  name: "BriMessage",
  fields: () => ({
    noLC: { type: GraphQLString },
    noPo: { type: GraphQLString },
    program: { type: GraphQLString },
    message: { type: MessageType },
  }),
});
