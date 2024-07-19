import { NextPage } from "next";

import UserForm from "../../../components/UserForm/UserForm";

const Home: NextPage = () => {
  return (
    <div>
      <h1>User Registration</h1>
      <UserForm />
    </div>
  );
};

export default Home;
