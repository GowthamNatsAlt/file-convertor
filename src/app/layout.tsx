import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/themeprovider";

const montserrat = Montserrat({ subsets: ["latin"], weight : ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "FileConv",
  description: "A SAAS web application capable of converting multiple files into a desired format for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        suppressHydrationWarning={true}
        className={montserrat.className}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
