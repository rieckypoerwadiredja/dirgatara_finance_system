import { GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import { BankBri } from "../../Entities/BankBri";
import { BankBriMessageType } from "../TypeDefs/BankBri";
import { validateBankBriInput } from "../../utils/validations";

export const CREATE_BANK_BRI_MUTATION = {
  type: BankBriMessageType,
  args: {
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
    rating: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const {
      noLC,
      noPo,
      suplier,
      program,
      nominal_RP,
      nilai_akseptasi_RP,
      nilai_akseptasi_USD,
      nominal_USD,
      tanggal_terbit,
      tanggal_expire,
      rating,
    } = args;

    // Lakukan validasi
    const validationError = validateBankBriInput(
      noLC,
      noPo,
      suplier,
      program,
      nominal_RP,
      nominal_USD,
      nilai_akseptasi_RP,
      nilai_akseptasi_USD,
      tanggal_terbit,
      tanggal_expire,
      rating
    );
    if (validationError) {
      throw new Error(validationError); // Jika ada kesalahan validasi, lemparkan error
    }

    const id: number = Number(Math.floor(Date.now() / 1000));
    await BankBri.insert({
      id,
      noLC,
      noPo,
      suplier,
      program,
      nominal_RP,
      nominal_USD,
      nilai_akseptasi_RP,
      nilai_akseptasi_USD,
      tanggal_terbit,
      tanggal_expire,
      rating,
    });
    return {
      noLC,
      noPo,
      program,
      message: {
        sucessfull: true,
        message: "Bank Bri Bank created successfully",
      },
    };
  },
};

export const DELETE_BANK_BRI_MUTATION = {
  type: BankBriMessageType,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    try {
      await BankBri.delete(id);
      return {
        message: {
          sucessfull: true,
          message: `BRI ${id} has been deleted`,
        },
      };
    } catch (error: any) {
      // Tangani kesalahan yang terjadi saat menghapus pengguna
      return {
        message: {
          sucessfull: false,
          message: "Bank Bri Bank fail",
        },
      };
    }
  },
};
