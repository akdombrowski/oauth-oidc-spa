import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [tokenReqTry, setTokenReqTry] = useState(0);
  const authzEndpoint =
    "https://auth.pingone.com/8bac8420-b828-49bd-9b22-c0a6e141d71e/as/authorize";
  const responseType = "code";
  const clientID = "55a6c012-a112-4ee3-8ca1-a5081ad1fca9";
  const redirectURI = "http://localhost:3000";
  const scope = "p1:read:user";

  const authorizationRequest =
    authzEndpoint +
    "?" +
    "response_type=" +
    responseType +
    "&" +
    "client_id=" +
    clientID +
    "&" +
    "redirect_uri=" +
    redirectURI +
    "&" +
    "scope=" +
    scope;

  const tokenEndpoint =
    "https://auth.pingone.com/8bac8420-b828-49bd-9b22-c0a6e141d71e/as/token";
  const grantType = "authorization_code";

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

    setToken(json);
    console.log(json);
  };

  useEffect(() => {
    const location = window.location;
    const queryParam = location.search;

    const code = queryParam.match(/(?<=code=)([\w-]+[^&])/g);

    if (code && tokenReqTry < 3) {
      // token request
      tokenRequest(code);
      const tryNum = tokenReqTry + 1;
      setTokenReqTry(tryNum);
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
        <a href={authorizationRequest}>Login</a>
        <output></output>
      </header>
    </div>
  );
}

export default App;
