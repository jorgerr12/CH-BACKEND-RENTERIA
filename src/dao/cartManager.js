import fs from "fs/promises"
import { __dirname } from "../utils.js"
import { existsSync } from "fs";
import path from "path"

export class CartManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `/data/${fileName}`)

    }
    async getDatos() {
        const cart = await fs.readFile(this.path, "utf-8")
        const _cart = await JSON.parse(cart)
        return _cart
    }

    async writeFile(data) {
        const cart = JSON.stringify(data, null, "\t")
        return await fs.writeFile(this.path, cart, "utf-8")
    }
    async createCart() {
        const cart = await this.getDatos()
        const newCart = { id: cart.length + 1, products: [] }
        cart.push(newCart)
        await this.writeFile(cart)
        return cart;
    }
    async getCartById (cid){
        const cart = await this.getDatos()
        const _cart = cart.find((item) => item.id === cid)
        if(_cart){
            return _cart
        }
        else{
            return null
        }
    }
    async addToCart(cid, pid) {
        let cart = await this.getDatos()

        const order = cart.find((item)=>item.id ===cid)
        const indexOrder = cart.indexOf(order)
        console.log("order",order)
        if(order){
            const locate= cart[indexOrder].products.find((item)=>item.prodId === pid)
            const indexLocate = cart[indexOrder].products.indexOf(locate)
            if(locate){
                cart[indexOrder].products[indexLocate].quantity++
                await this.writeFile(cart)
                return cart
            }
            else{
            const newProduct = {prodId:pid,quantity:1}
            cart[indexOrder].products.push(newProduct)
            await this.writeFile(cart)    
            return cart
            }

        }
        else{
            return null
        }

    }
}