import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      console.log(username,password)
      const { data } = await login({ variables: { username, password } });

      
      const token = data.login;

      handleLogin(token);
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {error && <div>Error occurred while logging in</div>}
      </form>
    </div>
  );
};

export default LoginForm;
