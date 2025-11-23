import type { Metadata } from "next";
import Link from "next/link";

import lang from "@/lang/id/auth/auth.lang";
import { LoginForm } from "@/features/auth/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Anda",
};

/**
 * Login page
 * Displays login form and link to registration page
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              {lang.loginTitle}
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan kata sandi Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-muted-foreground text-center text-sm">
              {lang.dontHaveAccount}{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                {lang.goToRegister}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
