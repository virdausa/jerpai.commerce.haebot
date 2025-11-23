import { ProfileContent } from "@/features/auth/components/profile-content";
import lang from "@/lang/id/auth/auth.lang";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: lang.profileTitle,
  description: lang.profileTitle,
};

/**
 * Profile Page Route
 * Displays user profile information from auth store
 */
export default function ProfilePage() {
  return <ProfileContent />;
}
