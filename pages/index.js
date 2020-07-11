import React from 'react'
import axios from 'axios';

function Home({ products }) {
  // console.log(products)
  // useEffect when interact with the outside world
  // it runs after products mount
  // React.useEffect(() => {
  //   getProducts()

  // }, [])
  // fetch data on the client
  // async function getProducts() {
  //   // to make http request both on client and server
  //   // make get request at product end points
  //   const url = "http://localhost:3000/api/products";
  //   const response = await axios.get(url)
  // }
  return <>home</>;
}

Home.getInitialProps = async () => {
  //fetch data on server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url)
  // return response data as an object
  return { products: response.data };
  // note: this object will be merged with existing props

}
export default Home;
