import { NextPage } from "next";

import LoginForm from "../../../components/LoginForm/LoginForm";

const Login: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
