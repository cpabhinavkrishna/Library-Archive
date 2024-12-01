const mongoose = require("mongoose");
const Users = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart_data: [
      { book_id: { type: mongoose.Schema.Types.ObjectId, ref: "books" } },
    ],
    created_on: {
      type: Date,
      default: Date.now,
    },
    subscription_data: [
      {
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
        start_date: { type: Date },
        end_date: { type: Date },
        returned: { type: Boolean, default: false },
      },
    ],
  },
  { collection: "users" }
);
const model = mongoose.model("Users-model", Users);
module.exports = model;
