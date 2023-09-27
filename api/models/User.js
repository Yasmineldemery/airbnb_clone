const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: {
      type: String,
      default: uuid.v4,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: { updatedAt: "lastModifiedAt", createdAt: "createdAt" } }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
