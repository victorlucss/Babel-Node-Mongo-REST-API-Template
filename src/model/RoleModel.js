import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

export default model("Role", schema, "roles");
