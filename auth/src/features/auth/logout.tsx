"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const supabase = createClient();

  const signout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <Button variant="outline" onClick={signout}>
      Logout
    </Button>
  );
};
