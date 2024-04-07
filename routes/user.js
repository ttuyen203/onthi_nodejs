import expess from "express";
import UserController from "../controllers/user";
const router = expess.Router();

const userController = new UserController();

router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);

export default router;
