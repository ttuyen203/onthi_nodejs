import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import userValid from "../validations/user";

class UserController {
  async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = userValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessages,
        });
      }

      const emailValid = await User.findOne({ email });
      if (emailValid) {
        return res.status(400).json({
          message: "Email đã tồn tại",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        email,
        password: hashPassword,
      });
      return res.status(201).json({
        message: "Đăng ký thành công",
        data: newUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = userValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessages,
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được đăng ký",
        });
      }

      const isPassword = await bcryptjs.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          message: "Mật khẩu không đúng",
        });
      }

      const token = jwt.sign({ userId: user._id }, "hii", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Đăng nhập thành công",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
