"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 as Loader2Icon } from "lucide-react";

import lang from "@/lang/id/auth/auth.lang";
import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/types/auth-schemas";
import { loginUser } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/providers/auth-store-provider";
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
 * Login form component with validation
 * Handles user authentication and stores token/user data
 */
export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  /**
   * Handle form submission
   * Calls login API, stores token and user data, redirects to home
   */
  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);

    try {
      const response = await loginUser(data);

      if (response.success && response.token) {
        // Store user and token in auth store
        login(response.user, response.token);

        toast.success(lang.loginSuccess);
        router.push("/");
      } else {
        toast.error(lang.loginError);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(lang.loginError);
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
            lang.loginButton
          )}
        </Button>
      </form>
    </Form>
  );
}
