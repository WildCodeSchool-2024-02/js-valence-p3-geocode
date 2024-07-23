
export default function DashboardAdmin() {
  return (
    <div className="grid min-h-screen grid-cols-12 text-white">
      <aside className="col-span-2 p-4 bg-[#1f2937]">
        <h2 className="mb-8 text-2xl font-bold ">Welcome Admin!</h2>
        <nav className="space-y-4">
          <a href="/" className="block px-4 py-2 rounded hover:bg-[#15803d]">
            Dashboard
          </a>         
        </nav>
      </aside>
      <div className="grid col-span-10 grid-rows-7">
        <header className="flex items-center justify-between p-4 bg-blue-500"/>
        <main className="row-span-6 p-4 bg-green-500">
          <h1 className="mb-4 text-3xl font-bold">Global Statistics</h1>
        </main>
      </div>
    </div>
  );
}
