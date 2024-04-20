export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen max-w-md items-center m-auto">
      {children}
    </main>
  );
}
