import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kanban Task Board",
  description: "A simple Trello-style task management board",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
