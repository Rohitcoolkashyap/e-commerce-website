const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rohit-site.now.sh"
    : "http://localhost:3000";

export default baseUrl;
