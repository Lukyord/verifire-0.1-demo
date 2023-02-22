import Header from "../src/Header/Header";
import MobileNavBar from "../src/MobileNavBar/MobileNavBar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div className="relative">
          <MobileNavBar />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
