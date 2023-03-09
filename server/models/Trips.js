const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const tripsSchema = new Schema({
  tripId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = tripsSchema;
