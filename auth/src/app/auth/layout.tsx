import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/");
  return <>{children}</>;
};

export default AuthLayout;
