import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import App from "./App";
import { StateContextProvider } from "./context";
const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    desiredChainId={11155111}
    activeChain={Sepolia}
    clientId="4a8e6d572fb4f7ba0895ff482bd2344f"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
