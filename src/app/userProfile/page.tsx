"use client";
import { useLoggedInUser } from "@/hooks/useLoggedInUser"; // Import the custom hook

export default function UserProfile() {
  const { loggedInUser } = useLoggedInUser(); // Use the hook
console.log("loggedInUser", loggedInUser)
  // if (loading) {
  //   return <p>Loading...</p>; // Show a loading message until data is fetched
  // }

  // if (!loggedInUser) {
  //   return <p>No user found or error fetching data.</p>; // Handle cases when no user is returned or an error occurs
  // }

  return (
    <div>
      <h2>Welcome, {loggedInUser?.name}</h2>
      <p>Email: {loggedInUser?.email}</p>
      {/* Render more user data */}
    </div>
  );
}
