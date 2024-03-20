import { GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import { BankBG } from "../../Entities/BankBG";
import { BankBGMessageType } from "../TypeDefs/BankBG";
import { validateBankBGInput } from "../../utils/validations";

export const CREATE_BANK_BG_MUTATION = {
  type: BankBGMessageType,
  args: {
    noRef: { type: GraphQLString },
    pekerjaan: { type: GraphQLString },
    tipe: { type: GraphQLString },
    program: { type: GraphQLString },
    kode_program: { type: GraphQLString },
    vauta_asli: { type: GraphQLInt },
    jenis_vauta_asli: { type: GraphQLString },
    tgl_terbit: { type: GraphQLString },
    tgl_berlaku: { type: GraphQLString },
    tgl_jatuh_tempo: { type: GraphQLString },
    bank: { type: GraphQLString },
    deposito_giro: { type: GraphQLInt },
    jenis: { type: GraphQLString },
    norek: { type: GraphQLString },
    tgl_pembukuan: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const {
      noRef,
      pekerjaan,
      tipe,
      program,
      kode_program,
      vauta_asli,
      jenis_vauta_asli,
      tgl_terbit,
      tgl_berlaku,
      tgl_jatuh_tempo,
      bank,
      deposito_giro,
      jenis,
      norek,
      tgl_pembukuan,
    } = args;

    // Lakukan validasi
    const validationError = validateBankBGInput(
      noRef,
      pekerjaan,
      tipe,
      program,
      kode_program,
      vauta_asli,
      jenis_vauta_asli,
      tgl_terbit,
      tgl_berlaku,
      tgl_jatuh_tempo,
      bank,
      deposito_giro,
      jenis,
      norek,
      tgl_pembukuan
    );
    if (validationError) {
      throw new Error(validationError); // Jika ada kesalahan validasi, lemparkan error
    }

    const id: number = Number(Math.floor(Date.now() / 1000));
    await BankBG.insert({
      id,
      noRef,
      pekerjaan,
      tipe,
      program,
      kode_program,
      vauta_asli,
      jenis_vauta_asli,
      tgl_terbit,
      tgl_berlaku,
      tgl_jatuh_tempo,
      bank,
      deposito_giro,
      jenis,
      norek,
      tgl_pembukuan,
    });
    return {
      noRef,
      id,
      program,
      kode_program,
      message: {
        sucessfull: true,
        message: "Bank Bri Bank created successfully",
      },
    };
  },
};

export const DELETE_BANK_BG_MUTATION = {
  type: BankBGMessageType,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    try {
      // Lakukan penghapusan data berdasarkan ID
      const deletedBankBri = await BankBG.delete(id);

      // Jika penghapusan berhasil
      if (deletedBankBri.affected !== 0) {
        return {
          message: {
            sucessfull: true,
            message: `BRI ${id} has been deleted successfully`,
          },
        };
      } else {
        // Jika tidak ada data yang dihapus
        return {
          message: {
            sucessfull: false,
            message: `BRI ${id} not found or could not be deleted`,
          },
        };
      }
    } catch (error: any) {
      // Tangani kesalahan yang terjadi saat menghapus data
      return {
        message: {
          sucessfull: false,
          message: "Failed to delete Bank Bri data",
        },
      };
    }
  },
};
