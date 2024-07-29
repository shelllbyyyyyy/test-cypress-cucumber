"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export const SignInWithGithubButton = () => {
  const [isLoading, setIsloading] = useState(false);
  const supabase = createClient();

  const signInWithGithub = async () => {
    try {
      setIsloading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) toast.error(error?.message);
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Button
      onClick={signInWithGithub}
      size="lg"
      variant="outline"
      disabled={isLoading}
    >
      <Image
        src="/assets/icon/github.svg"
        height={20}
        width={20}
        alt="google logo"
        className="mr-2"
      />
      Continue with github
    </Button>
  );
};
