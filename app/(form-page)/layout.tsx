
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className='container pt-3'>
      <div className='flex justify-center items-center h-screen' style={{ marginTop: 'calc(calc(var(--header-height) * -1) - 0.75rem)' }}>
        <section className='p-10 w-full md:w-2/4 border-zinc-500 border-2 rounded shadow-sm shadow-slate-500'>
          {children}
        </section>
      </div>
    </main>
  );
}
