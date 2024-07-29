import { createClient } from "@/utils/supabase/client";

export const findUserByEmail = async (email: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return null;
  }

  const user = data.users.find((user) => user.email === email);

  return user;
};
