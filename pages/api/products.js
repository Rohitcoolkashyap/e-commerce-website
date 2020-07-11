import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'

connectDb();
// routes
export default (req, res) => {
    res.status(200).json(products)

}