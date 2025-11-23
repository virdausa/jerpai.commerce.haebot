"use client";

import { useAuthStore } from "@/features/auth/providers/auth-store-provider";
import lang from "@/lang/id/auth/auth.lang";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

/**
 * Formats date string to readable format
 * @param dateString - ISO date string
 * @returns Formatted date or Not Available text
 */
const formatDate = (dateString: string | null) => {
  if (!dateString) return lang.profileNotAvailable;
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Renders a profile field row
 * @param label - Field label
 * @param value - Field value
 */
const ProfileField = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <div className="flex flex-col gap-1 border-b pb-3 last:border-b-0 sm:flex-row sm:justify-between">
    <span className="text-muted-foreground text-sm font-medium">{label}</span>
    <span className="text-sm font-normal">
      {value || lang.profileNotAvailable}
    </span>
  </div>
);

/**
 * Profile Content Component
 * Displays read-only user profile information from the auth store
 * Redirects to login if user is not authenticated
 */
export function ProfileContent() {
  const { user, isAuthenticated } = useAuthStore((state) => state);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    redirect("/auth/login");
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
            <User className="h-8 w-8 text-white sm:h-10 sm:w-10" />
          </div>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold sm:text-3xl">
              {user.name}
            </CardTitle>
            <p className="text-muted-foreground text-sm">@{user.username}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <ProfileField label={lang.profileEmail} value={user.email} />
        <ProfileField label={lang.profilePhone} value={user.phone_number} />
        <ProfileField label={lang.profileAddress} value={user.address} />
        <ProfileField
          label={lang.profileBirthDate}
          value={formatDate(user.birth_date)}
        />
        <ProfileField label={lang.profileSex} value={user.sex} />
        <ProfileField
          label={lang.profileIdCardNumber}
          value={user.id_card_number}
        />
        <ProfileField label={lang.profileStatus} value={user.status} />
        <ProfileField
          label={lang.profileCreatedAt}
          value={formatDate(user.created_at)}
        />
        <ProfileField
          label={lang.profileUpdatedAt}
          value={formatDate(user.updated_at)}
        />
      </CardContent>
    </Card>
  );
}
