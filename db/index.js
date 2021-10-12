const mongoose = require("mongoose");
const { DB_URL } = require("../config");
console.log(DB_URL);
module.exports = () => {
  mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch(error => {
      console.error("数据库连接失败", error);
    });
};
