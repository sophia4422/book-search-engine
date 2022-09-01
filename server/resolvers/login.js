const { ApolloError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const user = await User.findOne({
    $or: [{ username: input.username }, { email: input.email }],
  });

  if (!user) {
    return ApolloError("Sorry, cannot find user");
  }

  const correctPw = await user.isCorrectPassword(input.password);

  if (!correctPw) {
    return ApolloError("Incorrect password!");
  }

  const token = signToken(user);

  return { token, user };
};

module.exports = login;
