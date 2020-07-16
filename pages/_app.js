import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Router from "next/router";
class MyApp extends App {
  // static methods access outside of classes
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      // ctx provides additional information about req and res
    }
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        // if authenticated but not of role 'root' || 'admin'
        // redirect from '/create' page
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }

        pageProps.user = user;
      } catch (error) {
        console.error(error, "error getting in current user");
        // 1.throw out invalid token
        destroyCookie(ctx, "token");

        // 2.redirect to login
        redirectUser(ctx, "/login");
      }
    }
    return { pageProps };
  }
  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }
  syncLogout = (event) => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        {/* this Component is returning all of the page the entire page component */}
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
