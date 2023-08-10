import jwtDecode from "jwt-decode";

export function ExpiredToken(token) {
  const decoded = jwtDecode(token);
  if (decoded.exp < Date.now() / 1000) {
    console.log("expierd");
  } else {
    return false;
  }
}
