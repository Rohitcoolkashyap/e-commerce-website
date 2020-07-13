// static json file
// import products from '../../static/products.json'
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';


connectDb();
// routes
// creating endpoint of products
export default async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products)

}