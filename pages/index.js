import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const accounts = JSON.parse(process.env.NEXT_PUBLIC_USERNAMES);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length == 0 || secret.length == 0) return;
    let found = false;
    found = accounts.find((account)=>{
      if(account.username===username&&account.secret==secret)
        return true
    })
    if(!found)
      return;
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username,
          secret,
        },
        {
          headers: { "Private-key": `${process.env.NEXT_PUBLIC_SECRET}` },
        }
      )
      .then((r) => router.push("/chats"));
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">IT Buddies Chat</div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
