const { AuthenticationError } = require('apollo-server-express');
const { User, Trips } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        return data;
      }
      throw new AuthenticationError('Please log in');
    },
    getTrips: async (parent, { _id }, context) => {
      console.log('before find')
      if (context.user) {
        const data = await User.find(
          { _id, _id },
          {})
        console.log(data);
        return data;
      }
    }
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
    saveTrip: async (parent, { tripData }, context) => {
      console.log('save trip mutation');
      if (context.user) {

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTrips: tripData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in");
    },
    removeTrip: async (parent, { tripId }, context) => {
      console.log('remove trip mutation');

      if (context.user) {
        console.log('mutation');
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTrips: { tripId } } },
          { new: true }
        );
        return updatedUser;
      }
    },
    updateTrip: async (parent, { trip }, context) => {
      console.log('Update Trip mutation')

      if (context.user) {
        console.log(context.user);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'savedTrips.tripId': trip.tripId },
          { $set: { 'savedTrips.$': trip } },
          {new:true, runValidators: true }
        )

        return updatedUser;
      }
      throw new AuthenticationError("Please log in");
    }
  },
};

module.exports = resolvers;
