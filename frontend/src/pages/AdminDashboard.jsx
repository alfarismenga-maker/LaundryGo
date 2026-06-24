import { useEffect, useState } from "react";
import api from "../lib/api";

function AdminDashboard() {
const user = JSON.parse(
localStorage.getItem("user")
);

if (!user || user.role !== "admin") {
return ( <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center"> <h1 className="text-3xl font-bold">
Akses Ditolak </h1> </div>
);
}

const [orders, setOrders] = useState([]);
const [stats, setStats] = useState({});
const [qrImage, setQrImage] = useState(null);

useEffect(() => {
loadOrders();
loadStats();
}, []);

const loadOrders = async () => {
try {
const res = await api.get("/api/orders");


  setOrders(res.data);
} catch (error) {
  console.log(error);
}


};

const loadStats = async () => {
try {
const res = await api.get("/api/orders/stats/dashboard");


  setStats(res.data);
} catch (error) {
  console.log(error);
}


};

const updateStatus = async (id, status) => {
try {
await api.put(
`/api/orders/${id}`,
{ status }
);


  loadOrders();
  loadStats();

  alert("Status berhasil diubah");
} catch (error) {
  console.log(error);
}


};

const showQr = async (id) => {
try {
const res = await api.get(`/api/qrcode/${id}`);


  setQrImage(res.data.qr);
} catch (error) {
  console.log(error);
}


};

return ( <div className="min-h-screen bg-slate-950 text-white flex">


  <div className="w-64 bg-slate-900 border-r border-slate-800 p-6">

    <h1 className="text-3xl font-bold text-blue-400 mb-10">
      LaundryGo
    </h1>

    <div className="space-y-4">

      <div className="bg-blue-600 p-3 rounded-lg">
        📊 Dashboard
      </div>

      <div className="bg-slate-800 p-3 rounded-lg">
        📦 Pesanan
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="bg-red-600 w-full p-3 rounded-lg mt-8"
      >
        🚪 Logout
      </button>

    </div>

  </div>

  <div className="flex-1 p-10">

    <h1 className="text-4xl font-bold mb-8">
      Dashboard Admin
    </h1>
    <p className="text-slate-400 mb-8">
  Selamat datang, {user?.name} 👋
</p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg">
          Total Pesanan
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.total_orders || 0}
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg">
          Pendapatan
        </h3>

        <p className="text-3xl font-bold mt-2">
          Rp {Number(
            stats.total_revenue || 0
          ).toLocaleString("id-ID")}
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg">
          Selesai
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.completed_orders || 0}
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg">
          Diproses
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.processing_orders || 0}
        </p>
      </div>

    </div>

    <div className="bg-slate-900 rounded-2xl shadow-lg overflow-hidden">

      <table className="w-full">

        <thead>
          <tr className="bg-slate-800">
            <th className="p-4">ID</th>
            <th className="p-4">Tanggal</th>
            <th className="p-4">Pelanggan</th>
            <th className="p-4">Layanan</th>
            <th className="p-4">Berat</th>
            <th className="p-4">Harga</th>
            <th className="p-4">Status</th>
            <th className="p-4">Aksi</th>
            <th className="p-4">QR</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
  key={order.id}
  className="border-t border-slate-700 hover:bg-slate-800 transition"
>
              <td className="p-4">{order.id}</td>

<td className="p-4">
  {order.created_at
    ? new Date(order.created_at).toLocaleString("id-ID")
    : "-"}
</td>

<td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      order.status === "Menunggu"
        ? "bg-yellow-500 text-black"
        : order.status === "Dicuci"
        ? "bg-blue-500 text-white"
        : order.status === "Disetrika"
        ? "bg-purple-500 text-white"
        : order.status === "Siap Diambil"
        ? "bg-orange-500 text-white"
        : order.status === "Selesai"
        ? "bg-green-500 text-white"
        : "bg-gray-500 text-white"
    }`}
  >
    {order.status}
  </span>
</td>

              <td className="p-4">
                {order.service_type}
              </td>

              <td className="p-4">
                {order.weight} Kg
              </td>

              <td className="p-4">
                Rp {Number(
                  order.total_price
                ).toLocaleString("id-ID")}
              </td>

              <td className="p-4">
                {order.status}
              </td>

              <td className="p-4">
                <select
                  className="bg-slate-800 border border-slate-700 text-white p-2 rounded-lg"
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >
                  <option>Menunggu</option>
                  <option>Dicuci</option>
                  <option>Disetrika</option>
                  <option>Siap Diambil</option>
                  <option>Selesai</option>
                </select>
              </td>

              <td className="p-4">
                <button
                  onClick={() =>
                    showQr(order.id)
                  }
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Lihat QR
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>

  </div>

  {qrImage && (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

      <div className="bg-white p-6 rounded-2xl">

        <h2 className="text-black text-xl font-bold mb-4">
          QR Code Pesanan
        </h2>

        <img
          src={qrImage}
          alt="QR Code"
          className="w-64 h-64"
        />

        <button
          onClick={() =>
            setQrImage(null)
          }
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Tutup
        </button>

      </div>

    </div>
  )}

<footer className="mt-10 border-t border-slate-800 pt-6 text-center text-slate-400">
  <p>© 2026 LaundryGo. All Rights Reserved.</p>
  <p className="mt-2 text-sm">
    Developed by Lydia & Indry
  </p>
</footer>

</div>


);
}

export default AdminDashboard;
