// App.js

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

import LoginForm from "./LoginForm";

const ME_QUERY = gql`
  query me{
    me {
      id
      username
    }
  }
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error occurred while fetching user data.</div>;
  }

  if (!isLoggedIn) {
    return <LoginForm handleLogin={handleLogin} />;
  }
  console.log(data)
  return (
    <div>
      <h1>Authenticated Content</h1>
      <p>User: {data?.me?.username}</p>
    </div>
  );
};

export default App;
