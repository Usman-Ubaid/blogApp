import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MessageProvider } from "./hooks/MessageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MessageProvider>
  </React.StrictMode>
);
