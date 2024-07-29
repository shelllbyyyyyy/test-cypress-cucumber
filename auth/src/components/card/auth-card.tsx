"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Login from "@/features/auth/login";
import Register from "@/features/auth/register";
import { SignInWithGithubButton } from "@/features/auth/SignInWithGithubButton";
import { SignInWithGoogleButton } from "@/features/auth/SignInWithGoogleButton";

export function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col justify-center item-center gap-2">
      <Tabs
        defaultValue="login"
        className="w-[400px]"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login onClick={() => handleTabChange("register")} />
        </TabsContent>
        <TabsContent value="register">
          <Register onClick={() => handleTabChange("login")} />
        </TabsContent>
      </Tabs>
      <h1 className="text-center">or</h1>
      <div className="flex flex-col gap-2">
        <SignInWithGithubButton />
        <SignInWithGoogleButton />
      </div>
    </div>
  );
}
