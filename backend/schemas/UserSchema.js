var mongoose = require("mongoose");
// hello
var UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileList: {
    type: Map,
    of: Object, // specify type for value
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  income: {
    type: Number,
    required: true
  },
  filingStatus: {
    type: [{
        type: String,
        enum: ["Single", "Married Filing Separately (MFS)", "Head of Household (HOH)"]
    }],
    required: true
  }
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
