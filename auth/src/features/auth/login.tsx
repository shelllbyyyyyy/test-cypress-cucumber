"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/ui/custom-form";

import { createClient } from "@/utils/supabase/client";
import { loginSchema, LoginSchema } from "@/validation/auth/login";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginProps = {
  onClick: () => void;
};

const Login: React.FC<LoginProps> = ({ onClick }) => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const handleLogin: SubmitHandler<LoginSchema> = async (value) => {
    const { email, password } = value;

    try {
      setIsloading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error)
        toast.error(error.message, {
          description: "Incorrect email/password, try register first",
        });

      if (data) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex justify-between w-full">
              <Button variant="link" onClick={onClick}>
                Didn't have an account ?
              </Button>
              <Link href="/auth/forgot-password">
                <Button variant="link">Forgot password</Button>
              </Link>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Login;
