export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/50">
      {children}
    </div>
  )
}
