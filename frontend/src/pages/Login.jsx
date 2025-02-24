import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
// import { useSignup } from "../hooks/useSignup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit", email, password);
    await login(email, password);
  };

  return (
    <form action="" onSubmit={handleSubmit} className="login">
      <h3>Log in</h3>
      <label htmlFor="">Email: </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="current-email"
      />

      <label htmlFor="">Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
