"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
import { updateSchema, UpdateSchema } from "@/validation/auth/update-password";

const UpdatePassword = () => {
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  const handleUpdatePassword: SubmitHandler<UpdateSchema> = async (value) => {
    const { password, confirmPassword } = value;
    try {
      setIsloading(true);
      if (confirmPassword !== password) toast.error("Password not match");

      const { data, error } = await supabase.auth.updateUser({ password });

      if (error)
        toast.error(error.message, {
          description: "Account not found",
        });

      if (data) {
        toast.success("Password has been updated", {
          description: "please login",
        });
        router.push("/auth");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <Button className="w-full" type="submit" disabled={isLoading}>
              Update password
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UpdatePassword;
