import { Schema, model } from "mongoose";

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: "",
  },

  lastUpdated: {
    type: Date,
    default: Date.now(),
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  versionKey: false,
});

export default model("User", schema, "users");
