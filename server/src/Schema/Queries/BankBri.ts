import { GraphQLList } from "graphql";
import { BankBri } from "../../Entities/BankBri";
import { BankBriType } from "../TypeDefs/BankBri";

export const GET_ALL_BANK_BRI = {
  type: new GraphQLList(BankBriType),
  resolve() {
    return BankBri.find();
  },
};
