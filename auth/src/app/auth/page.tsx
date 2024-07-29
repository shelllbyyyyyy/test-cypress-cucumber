import React from "react";

import { Auth } from "@/components/card/auth-card";

const Login = async () => {
  return (
    <section
      id="login"
      className="flex flex-col h-screen w-full justify-center items-center"
    >
      <Auth />
    </section>
  );
};

export default Login;
