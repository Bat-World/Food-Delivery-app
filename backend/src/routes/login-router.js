import createLogin from "../controller/login/create-login.js";

import { Router } from "express";


export const loginRouter = Router();

loginRouter.post("/", createLogin);

