const { Divider, Segment, Button } = require("semantic-ui-react");
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import calculateCartTotal from "../../utils/calculateCartTotal";
function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub Total:</strong>${cartAmount}
        <StripeCheckout
          name="Checkout"
          amount={stripeAmount}
          stripeKey="pk_test_51H5UB1EpuQbHQ4JoB8ASurlQvSy9Q0NbvuCx1mkySXJSteNdbZadr0FmoxqKSeAPjqrMX7XEGrJtnvo7OUmkp9hy00JZW9Z1LC"
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            disabled={isCartEmpty || success}
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
