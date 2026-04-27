import express from "express"
import { validate } from "../middlewares/userMiddlewares.js"
import { loginValidation, registerValidation } from "../validations/userValidation.js"
import { loginUser, registerUser } from "../controller/userController.js"

const router = express.Router()

router.post("/register", validate(registerValidation), registerUser)
router.post("/login", validate(loginValidation), loginUser)


export default router