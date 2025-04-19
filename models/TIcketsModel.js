import mongoose from "mongoose"


const tickets = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true},
    origin:{type:String,required:true},
    destination:{type:String,required:true},
    date:{type:Date,required:true},
    seats:{type:Number,required:true},
    request:{type:String,default:""}
})
const TicketsModel = mongoose.model("Book-Tickets",tickets)


export default TicketsModel