import cartsModel from "../models/carts.models.js"
import productsModel from "../models/products.model.js"

export class CartManager {
     getAll= async ()=> {
        try {
            const carts = await cartsModel.find()
            return carts

        } catch (error) {
            console.log("error getAll carts :",error)
        }

    }

    createCart = async (data)=>{
        try {
            const newCart = await cartsModel.create({
                ...data
            });
            return newCart
        } catch (error) {
            console.log("error createCarts :",error)
        }
    }

    getCartById = async (id)=>{
        try {
             const cart = await cartsModel.findById({_id:id});
             return cart;
        } catch (error) {
            console.log("error getCartById",error)
        }
    }

    updateCart = async (cid,produts)=>{
        try {
            const cart = await cartsModel.findByIdAndUpdate(cid,{produts:produts});
            return cart
        } catch (error) {
            console.log("error in upadateCart:",error)
        }
    }

    updateProductFromCart= async(cid,pid,qnt)=>{
    try {
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(item => item.product ==pid )
        cart.products[productIndex].quantity = qnt

        const upadatedCart = await cart.save();

        return upadatedCart
    } catch (error) {
        console.log("error updateProductoFromCart",error)
    }
    }

    deleteProduct = async(cid,pid)=>{
        try {
            const cart = await cartsModel.findById(cid)

            const productIndex = await cart.products.findIndex(item => item.product == pid)
            cart.products.splice(productIndex,1);

            const updatedCart = await cart.save()

            return updatedCart
        } catch (error) {
            console.log("error in deleteProduct",error)
        }
    }

    deleteAllProductsCart = async (cid)=>{
        try {
            const cart = await cartsModel.findById(cid)

            cart.products = []

            const cartEmpty = await cart.save()

            return cartEmpty
        } catch (error) {
            console.log("error in empty cart",error)
        }
    }
}