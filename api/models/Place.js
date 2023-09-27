const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    placeId: {
      type: String,
      default: uuid.v4,
      required: true,
      index: true,
      unique: true,
    },
    owner: {
      type: String,
      default: uuid.v4,
    },
    title: {
      type: String,
    },
    address: {
      type: String,
    },
    photos: {
      type: [String],
    },
    description: {
      type: String,
    },
    perks: {
      type: [String],
    },
    extraInfo: {
      type: String,
    },
    checkIn: {
      type: Number,
    },
    checkOut: {
      type: Number,
    },
    maxGuests: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: { updatedAt: "lastModifiedAt", createdAt: "createdAt" } }
);

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
