import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [authzCode, setAuthzCode] = useState("");

  const authorizeEndpoint =
    "https://auth.pingone.com/8bac8420-b828-49bd-9b22-c0a6e141d71e/as/authorize";
  const clientID = "0f70cad6-6a36-4865-a99c-4cfb8e83a68e";
  const responseType = "code";
  const scope = "p1:read:user";
  const redirectURI = "http://localhost:3000";

  const tokenEndpoint =
    "https://auth.pingone.com/8bac8420-b828-49bd-9b22-c0a6e141d71e/as/token";
  const grantType = "authorization_code";

  const authzReq =
    authorizeEndpoint +
    "?" +
    "client_id=" +
    clientID +
    "&" +
    "response_type=" +
    responseType +
    "&" +
    "redirect_uri=" +
    encodeURIComponent(redirectURI) +
    "&" +
    "scope=" +
    scope;

  const tokenRequest = async (code) => {
    const body = new URLSearchParams();
    body.append("grant_type", grantType);
    body.append("code", code);
    body.append("redirect_uri", redirectURI);
    body.append("client_id", clientID);

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      body: body,
    });

    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    const location = window.location;
    const queryParam = location.search;

    const code = queryParam.match(/(?<=code=)([\w-]+[^&])/g);
    if (code) {
      tokenRequest(code);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <a href={authzReq}>Login</a>
      </header>
    </div>
  );
}

export default App;
