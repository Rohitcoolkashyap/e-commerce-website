import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Order from "../../models/Order";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    // 1.verify and get user id from token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // 2.find cart bases on user id, populate it
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });

    // 3.calculate cart totals again from cart products
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
    // 4.get email for payment data ,see if email linked with
    // existing Stripe customer

    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });

    const isExistingCustomer = prevCustomer.data.length > 0;
    // 5.if not existing customer create them based on their email
    var newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    console.log("testing 0.1 ............");

    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    //    6.create charge with total send receipt email
    console.log("testing 0 ............");

    const charge = await stripe.charges.create(
      {
        currency: "usd",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      }
    );
    console.log("testing 01 ............");

    // 7 .add order data to database
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save();
    console.log("testing 1 ............");

    // 8. clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
    console.log("testing 2 ............");

    // 9.send back success (200) response to client
    res.status(200).send("Checkout Successfull");
  } catch (error) {
    console.log("checkout error", error);
    res.status(500).send("Error in checkout server");
  }
};
