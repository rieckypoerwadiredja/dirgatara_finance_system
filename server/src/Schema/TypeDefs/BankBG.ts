import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import { MessageType } from "./Message";

export const BankBriType = new GraphQLObjectType({
  name: "Bri",
  fields: () => ({
    id: { type: GraphQLInt },
    noRef: { type: GraphQLString },
    pekerjaan: { type: GraphQLString },
    tipe: { type: GraphQLString },
    program: { type: GraphQLString },
    kode_program: { type: GraphQLString },
    vauta_asli: { type: GraphQLString },
    jenis_vauta_asli: { type: GraphQLString },
    tgl_terbit: { type: GraphQLString },
    tgl_berlaku: { type: GraphQLString },
    tgl_jatuh_tempo: { type: GraphQLString },
    bank: { type: GraphQLString },
    deposito_giro: { type: GraphQLString },
    jenis: { type: GraphQLString },
    norek: { type: GraphQLString },
    tgl_pembukuan: { type: GraphQLString },
  }),
});

export const BankBGMessageType = new GraphQLObjectType({
  name: "BriMessage",
  fields: () => ({
    id: { type: GraphQLInt },
    noRef: { type: GraphQLString },
    pekerjaan: { type: GraphQLString },
    tipe: { type: GraphQLString },
    program: { type: GraphQLString },
    kode_program: { type: GraphQLString },
    vauta_asli: { type: GraphQLString },
    jenis_vauta_asli: { type: GraphQLString },
    tgl_terbit: { type: GraphQLString },
    tgl_berlaku: { type: GraphQLString },
    tgl_jatuh_tempo: { type: GraphQLString },
    bank: { type: GraphQLString },
    deposito_giro: { type: GraphQLString },
    jenis: { type: GraphQLString },
    norek: { type: GraphQLString },
    tgl_pembukuan: { type: GraphQLString },
    message: { type: MessageType },
  }),
});
