import StarField from "@/components/star-field";

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
      <body>
        <StarField />
        <div className="app-layer">{children}</div>
      </body>
    </html>
  );
}
