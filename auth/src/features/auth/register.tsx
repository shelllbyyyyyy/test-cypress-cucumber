"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

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
import { registerSchema, RegisterSchema } from "@/validation/auth/register";

type RegisterProps = {
  onClick: () => void;
};

const Register: React.FC<RegisterProps> = ({ onClick }) => {
  const [isLoading, setIsloading] = useState(false);

  const supabase = createClient();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  const handleRegister: SubmitHandler<RegisterSchema> = async (value) => {
    const { email, password, name } = value;

    try {
      setIsloading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${origin}/auth/verified-success`,
        },
      });

      if (error) {
        console.log(error);
        toast.error(error.message, {
          description: "please try again later",
        });
      } else if (data.user) {
        toast("Account has been created", {
          description: "Please check your email to confirm",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)}>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="yourname"
              />
            </div>
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="confirmPassword"
                label="Retry Password"
                placeholder="********"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
            <Button variant="link" onClick={onClick} disabled={isLoading}>
              Already have an account ?
            </Button>

            <Button className="w-full" type="submit" disabled={isLoading}>
              Create an account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Register;
