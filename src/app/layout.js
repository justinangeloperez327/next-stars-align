import "./globals.css";

export const metadata = {
  title: {
    default: "Stars Align",
    template: "%s | Stars Align",
  },
  description: "Find opportunities, apply for jobs, and manage hiring in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
