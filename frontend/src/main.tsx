import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MessageProvider } from "./hooks/MessageContext.tsx";
import { SingleBlogProvider } from "./hooks/SingleBlogContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <SingleBlogProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SingleBlogProvider>
    </MessageProvider>
  </React.StrictMode>
);
