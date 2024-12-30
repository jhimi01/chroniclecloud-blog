import { useEffect, useState } from "react";
import { useCookie } from "./useCookie";

export default async function useUser() {
  const [user, setUser] = useState();

  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  const token = getCookie();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch("/api/loggedinuser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = response.json();
return { data }
 
}
