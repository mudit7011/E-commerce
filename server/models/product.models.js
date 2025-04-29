import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:[{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
        }
    }],
    seller:{
        type:String,
        // required:true
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product;
