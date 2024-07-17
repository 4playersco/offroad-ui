import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import * as Sentry from "@sentry/react";
import { Toaster } from "react-hot-toast";

import "typeface-open-sans";
import "typeface-merriweather";
import "typeface-josefin-sans";

import "normalize.css";
import "@/styles/global.scss";

import { ViewportProvider } from "@/hooks/useViewport";
import routes from "./routes";

const router = createBrowserRouter(routes);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: import.meta.env.SITE_API,
      credentials: "include",
    }),
  ]),
});

const App = () => {
  if (import.meta.env.NODE_ENV === "production") {
    Sentry.init({
      dsn: "https://c97b7370c6de41f09e5a1d9c079682f5@o461685.ingest.sentry.io/5463792",
    });
  }

  return (
    <ApolloProvider client={client}>
      <ViewportProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ViewportProvider>
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>
);
