import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://2484d1d7-965f-4234-9c16-685119e29ddb-00-3vnfkc3kz4k62.sisko.replit.dev/api/messages/${selectedConversation._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("chat-user")).tokens,
            },
          },
        );

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};
export default useGetMessages;
