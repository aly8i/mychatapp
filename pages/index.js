import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const accounts = [
    {
      username:"admin",
      secret:"adminasdfghjkl"
    },
    {
      username:"shadi",
      secret:"333"
    },
    {
      username:"prmarycat",
      secret:"999"
    },
    {
      username:"bigbill",
      secret:"1234"
    }
  ];

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
          headers: { "Private-key": "81a73e5e-d4e4-477f-ab2d-786d1afbee85" },
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
