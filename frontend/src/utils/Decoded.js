import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";

export function getAccessTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(
        cookie.substring("user=".length, cookie.length)
      );
      try {
        const user = JSON.parse(userCookie);
        return user.token.accessToken ? user.token.accessToken : null;
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        return null;
      }
    }
  }
  return null;
}

export function isAgent() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(
        cookie.substring("user=".length, cookie.length)
      );
      try {
        const user = JSON.parse(userCookie);

        const accessToken = user.token.accessToken;
        const decodedToken = jwt_decode(accessToken);

        // Check if user has admin role
        if (
          decodedToken &&
          decodedToken.userId &&
          decodedToken.userId.role.includes("admin")
        ) {
          return decodedToken.userId.role.includes("agent"); // User is an admin
        } else {
          return null; // User is not an admin
        }
      } catch (error) {
        return false; // Unable to parse user cookie
      }
    }
  }
  return false;
}

export function isAdmin() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(
        cookie.substring("user=".length, cookie.length)
      );
      try {
        const user = JSON.parse(userCookie);

        const accessToken = user.token.accessToken;
        const decodedToken = jwt_decode(accessToken);

        // Check if user has admin role
        if (
          decodedToken &&
          decodedToken.userId &&
          decodedToken.userId.role.includes("admin")
        ) {
          return decodedToken.userId.role.includes("admin"); // User is an admin
        } else {
          return null; // User is not an admin
        }
      } catch (error) {
         return false; // Unable to parse user cookie
      }
    }
  }
  return  false

}

export function isUser() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const userCookie = decodeURIComponent(
        cookie.substring("user=".length, cookie.length)
      );
      try {
        const user = JSON.parse(userCookie);

        const accessToken = user.token.accessToken;
        const decodedToken = jwt_decode(accessToken);

        // Check if user has admin role
        if (decodedToken) {
          return decodedToken; // User is an admin
        } else {
          return null; // User is not an admin
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        return false; // Unable to parse user cookie
      }
    }
  }
  return false;
}
