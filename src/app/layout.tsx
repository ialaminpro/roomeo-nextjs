import "./globals.css";
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Roomeo App",
  description: "Roomeo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
