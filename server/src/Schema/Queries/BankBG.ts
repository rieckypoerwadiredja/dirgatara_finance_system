import { GraphQLList } from "graphql";
import { BankBG } from "../../Entities/BankBG";
import { BankBriType } from "../TypeDefs/BankBG";

export const GET_ALL_BANK_BG = {
  type: new GraphQLList(BankBriType),
  resolve() {
    return BankBG.find();
  },
};
