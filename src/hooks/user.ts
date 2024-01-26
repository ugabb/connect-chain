import { signOut } from "next-auth/react";

import { destroyCookie } from "nookies";

const handleSignOut = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/logout", {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok)
      return console.log("Logout Error", response.status, response.statusText);
    destroyCookie(null, "access_token", { path: "/" });
    signOut();
  } catch (error) {
    console.log(error);
  }
};

const handleGetAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "GET",
      credentials: "include", // Include credentials
    });
    if (!response.ok) {
      console.log(response.status, response.statusText);
    }
    if (response.ok) {
      console.log(await response.json());
    }
    return response.json();
  } catch (error) {
    console.log("All users", error);
  }
};

export { handleSignOut, handleGetAllUsers };
