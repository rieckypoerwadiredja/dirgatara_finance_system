import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// Pages
import Admin from "./pages/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BRI from "./pages/BRI";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<Admin />} path="/admin" />
          <Route element={<BRI />} path="/bri" />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
