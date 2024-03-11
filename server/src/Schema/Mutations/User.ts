import { GraphQLID, GraphQLString } from "graphql";
import { UserMessageType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Message";
// Utils
import {
  validateUserInput,
  validateUserPassword,
} from "../../utils/validations";

export const CREATE_USER_MUTATION = {
  type: UserMessageType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, role, password } = args;
    console.log(name, username, role, password);
    // Lakukan validasi
    const validationError = validateUserInput(name, username, role, password);
    if (validationError) {
      throw new Error(validationError); // Jika ada kesalahan validasi, lemparkan error
    }

    const id: number = Math.floor(Date.now() / 1000);
    await Users.insert({ id, name, role, username, password });
    return {
      username,
      role,
      message: {
        sucessfull: true,
        message: "User created successfully",
      },
    };
  },
};

export const DELETE_USER_MUTATION = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    try {
      await Users.delete(id);
      return { sucessfull: true, message: `User ${id} has been deleted` };
    } catch (error: any) {
      // Tangani kesalahan yang terjadi saat menghapus pengguna
      return {
        sucessfull: false,
        message: `Failed to delete user ${id}. Error: ${error.message}`,
      };
    }
  },
};

export const UPDATE_USER_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;

    // Validasi input
    const validationError = validateUserPassword(oldPassword, newPassword);
    if (validationError) {
      throw new Error(validationError); // Jika ada kesalahan validasi, lemparkan error
    }

    // Cari pengguna berdasarkan nama pengguna
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      throw new Error("User not found");
    }

    const userPassword = user.password;

    if (oldPassword === userPassword) {
      await Users.update({ username: username }, { password: newPassword });
      return { sucessfull: true, message: "Password updated successfully" };
    } else {
      throw new Error("Incorrect old password");
    }
  },
};
