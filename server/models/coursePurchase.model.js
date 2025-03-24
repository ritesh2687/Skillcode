import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema({
    courseId:{
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed','failed'],
        default:'pending',
    },
    paymentId:{
        type:String,
        requiredLtrue
    }
},{timestamps:true});
export const CoursePurchase = mongoose.model('CoursePurchase',coursePurchaseSchema)