const jwt = require("jsonwebtoken");

/**
 * 用于注册用户的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} query
 * @returns
 */
const signUp = (Model, ctx, query) =>
  Model.create(query)
    .then((result) => {
      if (!result) {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        };
        return false;
      }
      const token = jwt.sign(
        {
          userName: result.userName,
        },
        "jianshu-server-jwt",
        {
          expiresIn: 3600 * 24 * 7,
        }
      );

      ctx.body = {
        code: 200,
        msg: "注册成功",
        token,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "注册异常",
        err: error,
      };
    });

/**
 * 用于注册验证用户是否存在的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const signUpFind = (Model, where) => Model.findOne(where);

/**
 * 用于用户登陆方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const login = (Model, ctx, where) =>
  Model.findOne(where)
    .then((result) => {
      if (!result) {
        ctx.body = {
          code: 300,
          msg: "用户名或者密码错误",
        };
        return false;
      }

      const token = jwt.sign(
        {
          userName: result.userName,
          _id: result._id,
        },
        "jianshu-server-jwt",
        {
          expiresIn: 3600 * 24 * 7,
        }
      );

      ctx.body = {
        code: 200,
        msg: "登陆成功",
        token,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "登陆异常",
        err: error,
      };
    });
/**
 * 用于用户token验证的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const userVerifyFindOne = (Model, ctx, where) =>
  Model.findOne(where)
    .then((result) => {
      if (result) {
        ctx.body = {
          code: 200,
          msg: "用户验证成功",
          user: result,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "用户验证失败",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "用户验证失败",
        err: error,
      };
    });

/**
 * 用于修改用户密码的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} conditions
 * @param {*} doc
 * @returns
 */
const updataPassword = (Model, ctx, conditions, doc) =>
  Model.updateOne(conditions, doc)
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        ctx.body = {
          code: 200,
          msg: "密码修改成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "密码修改失败",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "密码修改异常",
        err: error,
      };
    });

/**
 * 用于修改用户资料的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} conditions
 * @param {*} doc
 * @returns
 */
const updatePersonal = (Model, ctx, conditions, doc) =>
  Model.updateOne(conditions, doc)
    .then((result) => {
      if (result.n > 0) {
        ctx.body = {
          code: 200,
          msg: "资料更新成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "资料更新失败",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "资料更新异常",
        err: error,
      };
    });

module.exports = {
  login,
  signUp,
  signUpFind,
  updataPassword,
  userVerifyFindOne,
  updatePersonal,
};
