
import productModel from "../models/products.model.js"



export class ProductManager {

    getAll = async (queries) => {
        try {
            const produts = await productModel.find()
            return produts
        } catch (error) {
            console.log("error in get products", error)
        }
    }

    getWithPaginate = async (query, options) => {
        try {
            
            const result = await productModel.paginate(query, options);
            return result;
        } catch (error) {
            throw error;
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findById(id)

            return product
        } catch (error) {
            console.log("error in get product:", error)
        }
    }

    createProduct = async (product) => {
        try {
            const newProduct = await productModel.create(product)
            return newProduct
        } catch (error) {
            console.log("error in create producto", error)
        }
    }
    updateProduct = async (id, fieldsToUpdate) => {

        try {

            const updetedProduct = await productModel.findByIdAndUpdate(id, fieldsToUpdate)
            return updetedProduct

        } catch (error) {
            console.log("error in update product", error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id)
            return deletedProduct
        } catch (error) {
            console.log("error in deleted product", error)
        }
    }
}


