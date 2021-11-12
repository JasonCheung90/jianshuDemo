const {
  userLogin,
  userSignUp,
  userVerify,
  userUpdatePassWord,
  userUpdateInfo,
} = require("./users");

const { uploadMethod } = require("./upload");
module.exports = {
  userLogin,
  userSignUp,
  userVerify,
  userUpdatePassWord,
  userUpdateInfo,
  uploadMethod,
};
