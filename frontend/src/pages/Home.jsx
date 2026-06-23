import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5">
        <h1 className="text-3xl font-bold text-blue-400">
          LaundryGo
        </h1>

        <div className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-32">
        <h1 className="text-6xl font-bold">
          LaundryGo
        </h1>

        <p className="text-xl text-gray-300 mt-4">
          Solusi Laundry Modern dan Cepat
        </p>

        <button className="bg-blue-500 px-8 py-3 rounded-lg mt-8 hover:bg-blue-600 transition">
          Pesan Sekarang
        </button>
      </section>

      {/* Fitur */}
      <section className="px-10 mt-32">
        <h2 className="text-center text-4xl font-bold mb-10">
          Fitur Unggulan
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">
              Tracking Real-Time
            </h3>

            <p>
              Pantau proses laundry secara langsung.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">
              QR Code Pengambilan
            </h3>

            <p>
              Pengambilan laundry lebih aman dan cepat.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2">
              Dashboard Admin
            </h3>

            <p>
              Kelola pesanan dan laporan dengan mudah.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;