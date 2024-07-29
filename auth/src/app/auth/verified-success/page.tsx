import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const VerifiedSuccess = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center text-center">
      <h1>Your account is verified.</h1>
      <Link href="/auth">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default VerifiedSuccess;
