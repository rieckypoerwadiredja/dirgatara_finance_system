import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Message";

export const CREATE_USER_MUTATION = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    await Users.insert({ name, username, password });
    return args;
  },
};

export const DELETE_USER_MUTATION = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Users.delete(id);
    return { sucessfull: true, message: `User ${id} has been delete` };
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

    // Cari pengguna berdasarkan nama pengguna
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      throw new Error("User not found");
    }

    const userPassword = user.password;

    if (oldPassword === userPassword) {
      Users.update({ username: username }, { password: newPassword });
      return { sucessfull: true, message: "Password updated successfully" };
    } else {
      throw new Error("password do match");
    }
  },
};
