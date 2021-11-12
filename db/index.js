const mongoose = require("mongoose");
const { DB_URL, options } = require("../config");

module.exports = () => {
  mongoose
    .connect(DB_URL, options)
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((error) => {
      console.error("数据库连接失败", error);
    });
};
