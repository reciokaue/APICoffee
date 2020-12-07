import Products from "../models/Products"
import imagesView from "./imagesView"

export default {
    render(product: Products){
        return{
            id: product.id,
            name: product.name,
            type: product.type,
            price: product.price,
            description: product.description,
            images: imagesView.renderMany(product.images)
        }
    },
    renderMany(products: Products[]){
        return products.map(product => this.render(product))
    },
}