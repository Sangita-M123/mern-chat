import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://2484d1d7-965f-4234-9c16-685119e29ddb-00-3vnfkc3kz4k62.sisko.replit.dev/api/auth/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
