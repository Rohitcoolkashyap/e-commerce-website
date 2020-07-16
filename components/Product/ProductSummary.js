import { Item, Label } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";
function ProductSummary({ name, mediaUrl, _id, price, sku, user }) {
  return (
    <>
      <Item.Group>
        <Item>
          <Item.Image size="medium" src={mediaUrl} />
          <Item.Content>
            <Item.Description>
              <h4>{name}</h4>
              <p>${price}</p>
              <Label>SKU: {sku}</Label>
            </Item.Description>
            <Item.Extra>
              <AddProductToCart user={user} productId={_id} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}

export default ProductSummary;
