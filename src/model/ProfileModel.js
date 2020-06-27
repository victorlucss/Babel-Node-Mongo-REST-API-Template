import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  roles: [
      {
          type: String,
          ref: "Role"
      }
  ],

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

export default model("Profile", schema, "profiles");