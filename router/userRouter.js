import express from "express";
import { adminLogout, getAllDoctors, getUserDetails, patientLogout, patientRegister } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { addNewAdmin } from "../controller/userController.js";
import { isAdminAuthenticated,isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register",patientRegister);

router.post("/login",login);

router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);

router.get("/doctors",getAllDoctors);

router.get("/admin/me",isAdminAuthenticated,getUserDetails);

router.get("/patient/me",isPatientAuthenticated,getUserDetails);

router.get("/admin/logout",isAdminAuthenticated,adminLogout);

router.get("/patient/logout",isPatientAuthenticated,patientLogout);

export default router;