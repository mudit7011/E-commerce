import Product from "../models/product.models.js";



export const addProduct = async (req, res) => {
    const {name,description,price,category,stock}= req.body;
    if(!name || !description || !price || !category || !stock){
        return res.json({success:false,message:"Missing Details"})
    }
    try {
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            user:req.userId
        })

        return res.json({success:true,message:"Product Added Successfully",product})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.json({success:true,products})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
