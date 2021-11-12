const path = require("path");
const fs = require("fs");
const multer = require("koa-multer");
const router = require("koa-router")();
const { uploadMethod } = require("../controller");
router.prefix("/upload");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dir = "./public/uploads/" + year + month + day;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename(req, file, cb) {
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

const upload = multer({ storage });
router.post("/images", upload.single("myfile"), uploadMethod);
module.exports = router;
