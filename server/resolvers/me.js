const { ApolloError } = require("apollo-server");

const { User } = require("../models");

const me = async (_, __, { user }) => {
  const foundUser = await User.findOne({ _id: user._id });

  if (!foundUser) {
    return ApolloError("Sorry, the user with this id cannot be found");
  }

  return foundUser;
};

module.exports = me;
