const { AuthenticationError } = require('apollo-server-express');
const { User, Trips } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {}