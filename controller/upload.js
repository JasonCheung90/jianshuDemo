const path = require("path");

const uploadMethod = async (ctx) => {
  let { path } = ctx.req.file;
  path = ctx.origin + "" + path.replace("public", "");
  ctx.body = {
    data: path,
  };
};

module.exports = {
  uploadMethod,
};
