import App from "next/app";
import Layout from "../components/_App/Layout"
class MyApp extends App {
  // static methods access outside of classes
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
      // provides additional information
    }
    return { pageProps }

  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        {/* this Component is returning all of the page the entire page component */}
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp;
