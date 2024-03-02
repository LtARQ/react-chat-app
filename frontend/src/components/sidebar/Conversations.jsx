import useGetConversations from "../../hooks/useGetConversations.js";
import Conversation from "./Conversation.jsx";
import { getRandomEmoji } from "../../utility/emojis.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastidx={idx === conversations.length - 1}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
