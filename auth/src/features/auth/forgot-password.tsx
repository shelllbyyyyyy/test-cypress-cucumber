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
import { resetSchema, ResetSchema } from "@/validation/auth/reset-password";
import { findUserByEmail } from "@/lib/hooks/useFIndUser";

const InitiateResetPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const supabase = createClient();

  const form = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
  });

  const handleInitiateResetPassword: SubmitHandler<ResetSchema> = async (
    value
  ) => {
    const { email } = value;
    try {
      setIsloading(true);

      const user = await findUserByEmail(email);
      if (!user)
        throw toast.error("Account not found", {
          description: "Email has not been registered",
        });

      const { data } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/update-password`,
      });
      if (data)
        toast.success("Initiate reset password success", {
          description: "check your email",
        });
    } catch (error) {
      throw error;
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInitiateResetPassword)}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="Input your email"
                type="email"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
            <Button className="w-full" type="submit" disabled={isLoading}>
              Send verification link
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default InitiateResetPassword;
