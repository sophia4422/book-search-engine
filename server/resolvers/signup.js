const { ApolloError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const signup = async (_, { input }) => {
  const user = await User.create(input);

  if (!user) {
    return ApolloError(
      "Sorry, sign up didn't work this time, please try again"
    );
  }

  const token = signToken(user);

  return { token, user };
};

module.exports = signup;
