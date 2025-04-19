import jetwayUsermodel from "../models/Usermodel.js";
import nodemailer from "nodemailer"
import "dotenv/config"
import TicketsModel from "../models/TIcketsModel.js";

class jetwaycontroller {
  static async createUser(req, res) {
   try {
    const {name,email,password} = req.body
    const user = jetwayUsermodel({
      name,email,password
    })
   await user.save()
   res.status(201).json({message:"success"})
   } catch (error) {
    console.log(error);
   }
  }
  static async loginverify(req,res){
    try {
     const {email,password} = req.body
     const result =  await jetwayUsermodel.findOne({email:email})
      if(result === null){
      res.status(404).json({message:"failed"})
      }
    //  when email matched
     if(result.email === email && result.password === password){
      res.status(200).json({message:"success",id:result.email})
    }
    // when email not matched
    else if(result.email !== email){
      res.status(404).json({message:"failed"})
    }
    // when pass not mathced
    else if(result.password !== password){
      res.status(403).json({message:"failed"})
    }
    } catch (error) {
      console.log(error);
    }
  }

// user profile page details
static async userInfo(req,res){
  try {
    const {userId} = req.body
    const user = await  jetwayUsermodel.findOne({email:userId})
    res.status(200).json({data:user})
  } catch (error) {
    console.log(error);
  }
}
  // contact us thank you mail
  static async Confirmation(req, res) {
    try {
      const { emailEle, message } = req.body;
      let email = emailEle;
  
  
      let sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      let mailoption = {
        from: `"Jetway Support" <your-email@gmail.com>`,
        replyTo: process.env.EMAIL, // Add this!
        to: email,
        subject: "Thanks for contacting us",
        text: `Hello ${email},\n\nThank you for reaching out. We will get back to you soon!\n\nBest Regards, Jetway Team`,
        headers: {
          "List-Unsubscribe": "<mailto:capitalofreseacr@gmail.com>"
        }
      };
      
  
      await sender.sendMail(mailoption);
      res.status(200).json({ message: "Email sent successfully" });
  
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Email sending failed" });
    }
  }
  
  static async ForgotPass(req,res){
    try {
      const {email} = req.body
      const otp = Math.floor(100000 + Math.random()*900000)
      res.cookie("otp",{
        httpOnly: true, // JavaScript access nahi karega (Security)
        secure: true, // HTTPS pe hi kaam karega
        maxAge: 15 * 60 * 1000, // 15 minutes expiry
        sameSite: "Strict",
      })
    const sender  = nodemailer.createTransport({
        service:"gmail",
        auth :{
          user:process.env.EMAIL,
          pass:process.env.PASSWORD,
        }
      })
      const mailoption = {
        from: `"Jetway Support" <your-email@gmail.com>`,
        replyTo: process.env.EMAIL, // Add this!
        to: email,
        subject: "Password Reset Otp",
        text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
        headers: {
          "List-Unsubscribe": "<mailto:capitalofreseacr@gmail.com>"
        }
      }
      await sender.sendMail(mailoption);
      res.status(200).json({ message: "Email sent successfully" });
      
    } catch (error) {
      console.log(error);
    }
  }
  // ticket booking info saving in database

  static async Booktickets (req,res){
    try {
      const {name,email,origin,destination,seats,request,date} = req.body
      const data =  TicketsModel({
        name,email,origin,destination,date,seats,request
      })
      console.log(data);
      await data.save()
      res.status(200).json({Message:"booked successfully"})
    } catch (error) {
      console.log(error);
    }
  }
  static async FetchTickets (req,res){
    try {
      const {userId} = req.body
      console.log(userId);
      const data = await TicketsModel.find({email:userId })
      console.log(data);
      res.status(200).json({data:data})
    } catch (error) {
      console.log(error);
    }
  }
  static async cancelTicket(req,res){
    try {
    const {id} = req.body
    const data  = await TicketsModel.findByIdAndDelete({_id:id})
    console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}


export default jetwaycontroller;
