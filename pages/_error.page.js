export { Page };

function Page({ is404 }) {
  if (is404) {
    return "404 Page Not Found";
  } else {
    return "500 Internal Server Error";
  }
}
