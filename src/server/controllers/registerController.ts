import { type Request, type NextFunction, type Response } from "express";
import { User } from "../../database/userSchema.js";
import bcryptjs from "bcryptjs";
import CustomError from "../../customError/CustomError.js";

const register = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "The entered credentials are invalid"
    );
    next(customError);
  }
};

export default register;
