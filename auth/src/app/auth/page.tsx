import React from "react";

import { Auth } from "@/components/auth-card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/");

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
