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
      if (result) {
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
      } else {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "注册异常",
      };
      console.error(error);
    });

/**
 * 用于注册验证用户是否存在的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const signUpFind = (Model, ctx, where) =>
  Model.findOne(where).catch((error) => {
    ctx.body = {
      code: 400,
    };
    console.error(error);
  });

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
      if (result) {
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
      } else {
        ctx.body = {
          code: 300,
          msg: "用户名或者密码错误",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "登陆异常",
      };
      console.error(error);
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
      };
      console.error(error);
    });

/**
 * 用于修改用户密码的方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} query
 * @returns
 */
const updataPassword = (Model, ctx, query) =>
  Model.updateOne(query)
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
          msg: "密码失败成功",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        msg: "密码修改异常",
      };
      console.log(error);
    });

/**
 *用于增加数据公用方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} query
 * @returns
 */
/* const add = (Model, ctx, query) =>
  Model.create(query)
    .then((result) => {
      if (result) {
        ctx.body = {
          code: 200,
          msg: "添加用户成功",
          data: result,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "添加用户失败",
        };
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 400,
      };
      console.error(error);
    }); */
/**
 * 用于修改数据的公用方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @param {*} query
 * @returns
 */
const update = (Model, ctx, where, query) =>
  Model.updateOne(where, query)
    .then((result) => {
      ctx.body = {
        data: result,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 400,
      };
      console.error(error);
    });
/**
 * 用于删除数据公用方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const del = (Model, ctx, where) =>
  Model.findOneAndDelete(where)
    .then((result) => {
      ctx.body = {
        data: result,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 400,
      };
      console.error(error);
    });

/**
 * 用于查询数据公用方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const find = async (Model, ctx, where) =>
  Model.find(where)
    .then((result) => {
      ctx.body = {
        data: result,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 400,
      };
      console.error(error);
    });

/**
 * 用于查询单个数据公用方法
 * @param {*} Model
 * @param {*} ctx
 * @param {*} where
 * @returns
 */
const findOne = (Model, ctx, where) =>
  Model.findOne(where)
    .then((result) => {
      ctx.body = {
        data: result,
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 400,
        msg: "查询异常",
      };
      console.error(error);
    });

module.exports = {
  find,
  update,
  del,
  findOne,
  login,
  signUp,
  signUpFind,
  updataPassword,
  userVerifyFindOne,
};
