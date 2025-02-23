import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      let json;
      try {
        json = await response.json();
      } catch (err) {
        throw new Error("Failed to parse JSON response");
      }

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Signup failed");
        return;
      }

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return { signup, isLoading, error };
}
