const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      default: uuid.v4,
      required: true,
      index: true,
      unique: true,
    },
    placeId: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    userId: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  { timestamps: { updatedAt: "lastModifiedAt", createdAt: "createdAt" } }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
