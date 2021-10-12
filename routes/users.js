const router = require("koa-router")();
const {
  userDelete,
  userFind,
  userUpdate,
  userFindOne,
  userLogin,
  userSignUp,
  userVerify,
  userUpdatePassWord,
} = require("../controller");

router.prefix("/users");

//用户登陆
router.post("/login", userLogin);

//用户注册
router.post("/signUp", userSignUp);

//用户验证
router.post("/verify", userVerify);

//用户密码修改
router.post("/update/password", userUpdatePassWord);

// 修改系统用户
router.post("/update", userUpdate);

// 删除系统用户
router.delete("/del", userDelete);

// 查询所有系统用户
router.get("/find", userFind);

// 查询单个系统用户
router.get("/find/:id", userFindOne);

module.exports = router;
