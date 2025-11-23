import { ProfileContent } from "@/features/auth/components/profile-content";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata: Metadata = genMeta({
  title: "Profil Saya - Kelola Akun HaeBot",
  description:
    "Kelola informasi profil Anda, ubah pengaturan akun, dan lihat aktivitas Anda di HaeBot.",
  noIndex: true,
});

/**
 * Profile Page Route
 * Displays user profile information from auth store
 */
export default function ProfilePage() {
  return <ProfileContent />;
}
