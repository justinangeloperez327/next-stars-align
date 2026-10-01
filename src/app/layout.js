import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Stars Align",
    template: "%s | Stars Align",
  },
  description: "Find jobs, manage applications, and connect employers with candidates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
