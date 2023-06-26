import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

// nodejs implementation
// module.exports = mongoose.model("User", userSchema);
// import => const User = require("../../../User.model")
