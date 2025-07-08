import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
    },

    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clients", clientsSchema);