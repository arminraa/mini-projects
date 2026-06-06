import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/lib/QueryProvider";

export const metadata: Metadata = {
  title: "Draggable Todo",
  description: "Draggable Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
