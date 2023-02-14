import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ChatEngine = dynamic(
  () => import("react-chat-engine").then((module) => module.ChatEngine),
  {ssr: false}
)
const MessageFormSocial = dynamic(
  () => import("react-chat-engine").then((module) => module.MessageFormSocial),
  {ssr: false}
)


export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/");
  });

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID="2b50b9c0-c909-4281-afd4-fd6c56ef8bf9"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
