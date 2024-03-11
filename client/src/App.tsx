import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// Component
import CreateUser from "./component/CreateUser";
import GetAllUsers from "./component/GetAllUsers";
import UpdateUser from "./component/UpdateUser";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CreateUser />
      <UpdateUser />
      <GetAllUsers />
    </ApolloProvider>
  );
}

export default App;
