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
    getTrips: async (parent, { _id }) => {
      console.log('before find')
      const data = await User.find(
        { _id, _id },
        {})
      console.log(data);
      return data;
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
      console.log('mutation');
      if (context.user) {
        console.log('mutation');
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTrips: { tripId } } },
        );
        return updatedUser;
      }
    },
    updateTrip: async (parent, { tripData }, context) => {
      console.log(tripData)
      if (context.user) {
        console.log(context.user);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {$set: { savedTrips: tripData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in");
    }
    // updateTrip: async (parent, { tripData }, context) => {
    //   console.log(tripData)
    //   if (context.user) {
    //     console.log(context.user);
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       {
    //         $set: { savedTrips: tripData }            
    //       },
    //       { new: true, runValidators: true }
    //     );
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError("Please log in");
    // }
  },
};

module.exports = resolvers;
