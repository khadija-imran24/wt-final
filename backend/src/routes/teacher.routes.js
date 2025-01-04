import {Router} from "express";
import {signup, mailVerified, login, logout, addTeacherDetails, getTeacher, teacherdocuments,ForgetPassword,ResetPassword} from "../controllers/teacher.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";
import { authSchema } from "../middlewares/joiLogin.middleware.js";


const router = Router()

router.route("/signup").post(
    signup
)

router.route("/verify").get(
    mailVerified
)

router.route("/login").post(
    authSchema, login
)

router.route("/logout").post(
    authTeacher, logout
)


router.route("/teacherdocument/:id").get(authTeacher, getTeacher)

router.route("/teacherdocuments").post(teacherdocuments)

router.route("/verification/:id").post(addTeacherDetails)

router.route('/forgetpassword').post(ForgetPassword)

router.route('/forgetpassword/:token').post(ResetPassword)

export default router;
