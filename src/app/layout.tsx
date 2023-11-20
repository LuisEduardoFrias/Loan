import type { Metadata } from "next";
//import { Inter } from 'next/font/google'
import PushNotify from "cp/push_notify";
import "./globals.css";

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Loands app",
  description: "Manager loands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
        />
      </head>
      <body className={"inter.className"}>
        <PushNotify>
          <header>
            <h1>Prestamos</h1>
          </header>
          {children}
        </PushNotify>
      </body>
    </html>
  );
}
