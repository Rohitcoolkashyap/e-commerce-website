import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";
function Home({ products }) {
  return <ProductList products={products} />;
}

// fetch data from server before component mount
Home.getInitialProps = async () => {
  //fetch data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  // return response data as an object
  return { products: response.data };
  // note: this object will be merged with existing props
};
export default Home;
