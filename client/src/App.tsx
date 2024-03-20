import React from "react";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Pages
import Admin from "./pages/Admin";
import BG from "./pages/BG";
import Dashboard from "./pages/Dashboard";
import Navigation from "./component/layouts/Navigation";
import TableBG from "./pages/TableBG";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navigation />
        <div className="mt-10 gap-y-5 px-14">
          <Routes>
            <Route element={<Admin />} path="/admin" />
            <Route element={<BG />} path="/addBG" />
            <Route element={<TableBG />} path="/BGs" />
            <Route element={<Dashboard />} path="/" />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
