import mongoose from "mongoose";
const { Schema, model } = mongoose;
// import avatar from '../assets/avatar.png'

const usersSchema = new Schema({
  username: { 
    type: String ,
    required : true,
    unique:true
    },
    email: { 
        type: String ,
        required : true,
        unique : true,
    },
    password: { 
        type: String ,
        required : true,
    },
    address: { 
        type: String ,
        required : true,
    },
    avatar: { 
        type: String ,
        default:'/assets/avatar.png',
    },
    role:{
        type:String,
        default: "user",
        enum:['user','admin']
    },
    favorites:[{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
    }],
    cart:[{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
    }],
    orders:[{
        type: mongoose.Types.ObjectId,
        ref: 'Order',
    }]
}, {timestamps:true}
);


const User = model('User',usersSchema);
export default User;