import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import NavigationBar from "./components/NavigationBar";

export const metadata = {
  title: "Hotel Reservation",
  description: "CSC391 Project 2 - Hotel Reservation System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
