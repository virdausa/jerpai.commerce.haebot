import type { Metadata } from "next";
import Link from "next/link";

import lang from "@/lang/id/auth/auth.lang";
import { RegisterForm } from "@/features/auth/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata: Metadata = genMeta({
  title: "Buat Akun Baru - Daftar HaeBot",
  description:
    "Daftar akun HaeBot untuk kemudahan berbelanja suku cadang CNC. Akses fitur eksklusif, riwayat pesanan, dan penawaran khusus untuk pelanggan terdaftar.",
  noIndex: true,
});

/**
 * Registration page
 * Displays registration form and link to login page
 */
export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              {lang.registerTitle}
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan informasi Anda untuk membuat akun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-muted-foreground text-center text-sm">
              {lang.alreadyHaveAccount}{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                {lang.goToLogin}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
