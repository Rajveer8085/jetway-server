import express from "express";
import jetwaycontroller from "../controller/Controller.js";


const route = express.Router();

route.post("/createuser",jetwaycontroller.createUser)
route.post("/verify",jetwaycontroller.loginverify)
route.get("/verify",jetwaycontroller.loginverify)
route.post("/confirmation-mail",jetwaycontroller.Confirmation)
route.post("/forgotPass",jetwaycontroller.ForgotPass)
route.post("/userInfo",jetwaycontroller.userInfo)
route.post("/booktickets",jetwaycontroller.Booktickets)
route.post("/fetchtickets",jetwaycontroller.FetchTickets)
route.post("/cancelticket",jetwaycontroller.cancelTicket)
export default route;
