import { Router } from "express";
import multer from "multer";
import login from "../controllers/loginController.js";
import register from "../controllers/registerController.js";

const userRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, cb) {
    const separatedNameExtension = file.mimetype.split("/");
    const extension = separatedNameExtension[separatedNameExtension.length - 1];
    const uniqueSuffix = Date.now();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage });

userRouter.get("/login", login);
userRouter.post("/register", upload.single("image"), register);
export default userRouter;
