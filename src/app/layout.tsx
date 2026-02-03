import './globals.css'

// This is a pass-through layout - the actual layout with HTML/BODY is in [lang]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
