const { Schema, model } = require("mongoose");

// 用户模型对象
const userSchema = new Schema({
  userName: String,
  passWord: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
});
const userModel = model("users", userSchema);

module.exports = {
  userModel,
};
