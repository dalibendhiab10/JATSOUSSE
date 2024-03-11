export const metadata = {
    title: "70S - JAT SOUSSE -- SOON",
  };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="wrapper">{children}</div>
  );
}
