
import productModel from '../models/products.model.js'

export class ProductManager {

    getAll = async (queries) => {
        try {
            if (queries) {
                const filter = queries.Param ? queries.param : {}
                const options = {
                    sort: queries.sort ? { price: queries.sort } : {},
                    limit: queries.limit || 10,
                    page: queries.page || 1,
                }

                const products = await productModel.paginate(filter,options)
                return products
            }
            else {
                const produts = await productModel.find({})
                return produts
            }

        } catch (error) {
            console.log("error in get products",error)
        }
    }

    getProductById=async(id)=>{
        try {
            const product = await productModel.findById(id)

            return product
        } catch (error) {
            console.log("error in get product:",error)
        }
    }

    createProduct = async (product)=>{
        try {
            const newProduct = await productModel.create(product)
            return newProduct
        } catch (error) {
            console.log("error in create producto",error)
        }
    }
    updateProduct = async(id,fieldsToUpdate)=>{

        try {

            const updetedProduct = await productModel.findByIdAndUpdate(id,fieldsToUpdate)
            return updetedProduct

        } catch (error) {
            console.log("error in update product",error)
        }
    }

    deleteProduct = async(id)=>{
        try {
            const deletedProduct = await productModel.findByAndDelete(id)
            return deletedProduct
        } catch (error) {
            console.log("error in deleted product",error)
        }
    }
}


