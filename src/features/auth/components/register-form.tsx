"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 as Loader2Icon } from "lucide-react";

import lang from "@/lang/id/auth/auth.lang";
import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/types/auth-schemas";
import { registerUser } from "@/features/auth/services/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Registration form component with validation
 * Handles user registration and redirects to login on success
 */
export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  /**
   * Handle form submission
   * Calls register API and redirects to login on success
   */
  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true);

    try {
      const response = await registerUser(data);

      if (response.success) {
        toast.success(lang.registerSuccess);
        router.push("/login");
      } else {
        toast.error(response.message || lang.registerError);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(lang.registerError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang.nameLabel}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={lang.namePlaceholder}
                  disabled={isSubmitting}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang.emailLabel}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={lang.emailPlaceholder}
                  disabled={isSubmitting}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang.passwordLabel}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={lang.passwordPlaceholder}
                  disabled={isSubmitting}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Confirmation Field */}
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang.passwordConfirmationLabel}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={lang.passwordConfirmationPlaceholder}
                  disabled={isSubmitting}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-2 h-12 w-full"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2Icon className="size-4 animate-spin" />
              {lang.submitting}
            </span>
          ) : (
            lang.registerButton
          )}
        </Button>
      </form>
    </Form>
  );
}
