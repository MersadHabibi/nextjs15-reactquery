export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="mx-auto max-w-screen-2xl px-6">{children}</main>
    </>
  );
}
