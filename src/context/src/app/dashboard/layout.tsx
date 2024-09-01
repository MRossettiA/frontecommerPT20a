import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col ">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-semibold hover:text-gray-300">
            Profile
          </Link>
          <Link href="/dashboard/orders" className="text-xl font-semibold hover:text-gray-300">
            Orders
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <div >{children}</div>
      </main>
    </section>
  );
}
