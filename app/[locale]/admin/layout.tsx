import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Hello Sunshine",
  description: "Admin dashboard for Hello Sunshine booking management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-gray-50 min-h-screen">{children}</div>;
}
