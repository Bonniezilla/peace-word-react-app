import "../globals.css";

export const metadata = {
    title: "Sign in",
    description: "Log up"
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
          <body>{children}</body>
        </html>
      )
}