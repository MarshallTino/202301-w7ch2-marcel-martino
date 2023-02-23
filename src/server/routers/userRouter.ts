import { Router } from "express";
import login from "../controllers/loginController.js";
import register from "../controllers/registerController.js";

const userRouter = Router();

userRouter.get("/login", login);
userRouter.post("/register", register);
export default userRouter;
