import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MessageProvider } from "./hooks/MessageContext.tsx";
import { BlogDataProvider } from "./hooks/BlogDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <BlogDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BlogDataProvider>
    </MessageProvider>
  </React.StrictMode>
);
