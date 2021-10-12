const { userModel } = require("../models");
const jwt = require("jsonwebtoken");
const {
  signUp,
  signUpFind,
  login,
  userVerifyFindOne,
  updataPassword,
  find,
  update,
  del,
  findOne,
} = require("../utils");

// 用户注册
const userSignUp = async (ctx) => {
  const { userName, passWord } = ctx.request.body;
  const result = await signUpFind(userModel, ctx, { userName });

  let isExist = result ? true : false;

  if (isExist) {
    ctx.body = {
      code: 300,
      msg: "用户名已经存在",
    };
    return false;
  }
  await signUp(userModel, ctx, { userName, passWord });
};

// 用户登陆
const userLogin = async (ctx) => {
  const { userName, passWord } = ctx.request.body;
  await login(userModel, ctx, { userName, passWord });
};

// 验证用户登陆
const userVerify = async (ctx) => {
  const token = ctx.header.authorization.replace("Bearer ", "");
  const { _id } = jwt.verify(token, "jianshu-server-jwt");
  await userVerifyFindOne(userModel, ctx, { _id });
};

// 修改用户密码
const userUpdatePassWord = async (ctx) => {
  const { userName, passWord } = ctx.request.body;
  await updataPassword(userModel, ctx, { userName, passWord });
};

// 添加系统用户
/* const userAdd = async (ctx) => {
  let { userName, passWord } = ctx.request.body;
  await add(userModel, ctx, { userName, passWord });
}; */

//修改系统用户
const userUpdate = async (ctx) => {
  let { userName, passWord, _id } = ctx.request.body;
  await update(userModel, ctx, { _id }, { userName, passWord });
};

// 删除系统用户
const userDelete = async (ctx) => {
  let { _id } = ctx.request.body;
  await del(userModel, ctx, { _id });
};

//查询所用系统用户
const userFind = async (ctx) => {
  await find(userModel, ctx, null);
};

// 查询单个系统用户

const userFindOne = async (ctx) => {
  let { id } = ctx.params;
  await findOne(userModel, ctx, { _id: id });
};

module.exports = {
  userDelete,
  userUpdate,
  userFind,
  userFindOne,
  userLogin,
  userSignUp,
  userVerify,
  userUpdatePassWord,
};
