import User from "../models/user.js";

export const addBookInCart = async(req,res)=>{
    try{
        const bookid = req.headers['bookid'];
        const id = req.headers['id'];
        const userData = await User.findById(id);
        const isBookAlreadyInCart = userData.cart.includes(bookid);
        if(isBookAlreadyInCart){
            return res.status(400).json({message: "Books is already in cart"})
        }
        await User.findByIdAndUpdate(id,{$push:{cart : bookid}})
        res.status(200).json({message: "Book added in cart successfully" })
    }catch(err){
        res.status(500).json({message : "Internal server error"})
    }
}

export const deleteBookFromCart = async(req,res)=>{
    try{
        const bookid = req.headers['bookid'];
        const id = req.headers['id'];
        const userData = await User.findById(id);
        const isBookAvailableInCart = userData.cart.includes(bookid);
        if(!isBookAvailableInCart){
            return res.status(404).json({message : "Book is not available in cart"});
        }
        await User.findByIdAndUpdate(id,{$pull:{cart : bookid}});
        res.status(200).json({message : "Book is removed from cart successfully"});
    }catch(err){
        res.status(500).json({message : "Internal server error"})
    }
}

export const getAllCartBooks = async(req,res)=>{
    try{
        const id = req.headers['id'];
        const userData = await User.findById(id).populate('cart');
        const cartData =  userData.cart.reverse();
        if(!cartData){
            res.status(404).json({message: "Cart is empty"});
        }
        res.status(200).json(cartData);
    }catch(err){
        res.status(500).json({message : "Internal server error"})
     
    }
}