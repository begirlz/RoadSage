const { AuthenticationError } = require('apollo-server-express');
const { User, Trips } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        return data;
      }
      throw new AuthenticationError('Please log in');
    },
    // users: async () => {
    //   return User.find()
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username })
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Please enter a valid email address')
      }
      const dataPassword = await user.isCorrectPassword(password);
      if (!dataPassword) {
        throw new AuthenticationError('Incorrect password')
      }
      const token = signToken(user);
      return { token, user };
    },


    // addUser: async (parent, { username, email, password }) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError('No user found with this email address');
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect credentials');
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },

    //merge conflictc
    // saveTrip: async (parent, { trip }, context) => {
    //   console.log('mutation');
    saveTrip: async (parent, { origin, destination }, context) => {
      console.log('mutation1');
      console.log(typeof origin);
      console.log(origin);
      if (context.user) {
        console.log('mutation');
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTrips: { origin: origin, destination: destination } } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in");
    },
    // removeTrip: async (parent, { tripId }, context) => {
    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: user._id },
    //     { $pull: { savedTrips: { tripId: tripId } } },
    //     { new: true }
    //   );

    // },
    removeTrip: async (parent, { tripId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTrips: { tripId: tripId } } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
