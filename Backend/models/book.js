import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookSchema = new Schema({

    url:{
        type : String,
        required : true,
    },
    title:{
        type : String,
        required : true,
    },
    author:{
        type : String,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    description:{
        type : String,
        required : true,
    },
    language:{
        type : String,
        required : true,
    },



},{timestamps:true}
);

const Book = model('Book', bookSchema);
export default Book;