const fs = require("fs/promises");

class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getDatos(){
        const products = await fs.readFile(this.path,"utf-8");
        const _products = await JSON.parse(products);
        return _products;
        }

    async getProducts(){
        try {
            const products = await this.getDatos();
            return products;
        } catch (error) {
            return [];
        }

     }   

     async writeFile(data){
        const product = JSON.stringify(data,null,"\t");
        return await fs.writeFile(this.path,product,"utf-8");
     }

     async addProduct(product){
        let products = await this.getDatos();

        const newProduct = {id:products.length +1,...product};
        products.push(newProduct);
        await this.writeFile(products);
        return products
     }

     async getProductById(id){
        if(fs.existsSync(this.path)){
            const products = await this.getDatos();
            const product = products.find(item => item.id ===id);
            if(product){
                return product;
            }
            else{
                console.log("No se encuentra Producto")
            }
        }
        else{
            console.log("archivo no encontrado")
        }
     }

     async updateProduct(id,data){
        if(fs.existsSync(this.path)){
            const products = await this.getDatos();
            const product = await this.getProductById(id);
            const _product = {...product,...data}

            const updateList = products.map((item)=>{
                if(item.id === _product.id){
                    return _product
                }
                else {return item}
            })
            this.writeFile(updateList)
            return updateList
        }
        else{
            console.log("no se encontro el archivo")
        }
     }

     async deleteProduct(id){
        if(fs.existsSync(this.path)){
            const products = await this.getDatos();
            const filterProducts = products.filter((item)=> item.id !== id);
            await this.writeFile(filterProducts);
            return filterProducts

        }
        else{
            console.log("No se encontro el archivo")
        }
     }

    }

    module.exports = ProductManager;
