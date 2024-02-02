import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MessageProvider } from "./hooks/MessageContext.tsx";
import { SingleBlogProvider } from "./hooks/SingleBlogContext.tsx";
import { BlogDataProvider } from "./hooks/BlogDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <BlogDataProvider>
        <SingleBlogProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SingleBlogProvider>
      </BlogDataProvider>
    </MessageProvider>
  </React.StrictMode>
);
