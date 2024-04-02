import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://2484d1d7-965f-4234-9c16-685119e29ddb-00-3vnfkc3kz4k62.sisko.replit.dev/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("chat-user")).tokens,
          },
          body: JSON.stringify({ message }),
        },
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};
export default useSendMessage;
// {
//   headers: {
//     'Content-Type': 'application/json',
//     authorization: 'Bearer ' + localStorage.getItem('jwt'),
//   },
// }
