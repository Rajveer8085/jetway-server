import mongoose from "mongoose";

const NewUser = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true, unique: true },
});

const jetwayUsermodel = mongoose.model("jetwayUser", NewUser);

export default jetwayUsermodel;
