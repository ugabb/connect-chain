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

export { handleSignOut };
