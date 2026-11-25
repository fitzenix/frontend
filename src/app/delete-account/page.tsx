import type { Metadata } from "next";
import { AccountDeletionForm } from "@/components/legal/AccountDeletionForm";

export const metadata: Metadata = {
  title: "Delete Your Fitzenix Account",
  description: "Request deletion of your Fitzenix account and associated personal data.",
  alternates: { canonical: "/delete-account" },
  openGraph: {
    title: "Delete Your Fitzenix Account",
    description: "Request deletion of your Fitzenix account and associated personal data.",
    url: "/delete-account",
  },
  robots: { index: true, follow: true },
};

export default function DeleteAccountPage() {
  return <AccountDeletionForm />;
}
