export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-full">
      <div className="container mx-auto shadow-2xl my-24 p-8 flex flex-col gap-4">
        {children}
      </div>
    </main>
  );
}
