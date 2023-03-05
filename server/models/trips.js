const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const tripsSchema = new Schema({
  locations: [
    {
      type: String,
    },
  ],
  tripId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});

module.exports = tripsSchema;