import { useEffect, useState } from "react";
import api from "../lib/api";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] = useState([]);
  const [qrImage, setQrImage] = useState(null);

  const [form, setForm] = useState({
    service_type: "",
    weight: "",
    total_price: 0,
  });

  useEffect(() => {
    loadOrders();
  }, []);

 const loadOrders = async () => {
  try {
    const res = await api.get(`/api/orders/user/${user.id}`);

    console.log(res.data);

    setOrders(res.data);
  } catch (error) {
    console.log(error);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "weight") {
      const price = Number(value) * 7000;

      setForm({
        ...form,
        weight: value,
        total_price: price,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleOrder = async () => {
  try {

    if (!form.service_type || !form.weight) {
      alert("Lengkapi data pesanan");
      return;
    }

    await api.post(
      "/api/orders",
      {
        user_id: user.id,
        service_type: form.service_type,
        weight: form.weight,
        total_price: form.total_price,
      }
    );

    alert("Pesanan berhasil dibuat");

    setForm({
      service_type: "",
      weight: "",
      total_price: 0,
    });

    loadOrders();

  } catch (error) {
    console.log(error);
    alert("Gagal membuat pesanan");
  }
};

/* TAMBAHKAN DI SINI */
const showQr = async (id) => {
  try {
    const res = await api.get(`/api/qrcode/${id}`);

    setQrImage(res.data.qr);
  } catch (error) {
    console.log(error);
    alert("QR Code tidak ditemukan");
  }
};

const printReceipt = (order) => {
  const receiptWindow = window.open("", "_blank");

  receiptWindow.document.write(`
    <html>
      <body style="font-family: Arial; padding:20px;">
        <h2>LaundryGo</h2>
        <hr>
        <p><b>ID:</b> ${order.id}</p>
        <p><b>Layanan:</b> ${order.service_type}</p>
        <p><b>Berat:</b> ${order.weight} Kg</p>
        <p><b>Harga:</b> Rp ${Number(order.total_price).toLocaleString("id-ID")}</p>
        <p><b>Status:</b> ${order.status}</p>
      </body>
    </html>
  `);

  receiptWindow.document.close();
  receiptWindow.print();
};

  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (total, order) =>
      total + Number(order.total_price),
    0
  );

  const latestStatus =
    orders.length > 0
      ? orders[0].status
      : "Belum Ada Pesanan";

  return (
  <>
    <div className="min-h-screen bg-slate-950 text-white flex">

    {/* Sidebar */}
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        LaundryGo
      </h1>

      <div className="space-y-4">

        <div className="bg-blue-600 p-3 rounded-lg">
          🏠 Dashboard
        </div>

        <div className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700 cursor-pointer transition">
          📦 Pesanan Saya
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="bg-red-600 w-full p-3 rounded-lg mt-8 hover:bg-red-700"
        >
          🚪 Logout
        </button>

      </div>

    </div>

    {/* Content */}
    <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-2">
          Dashboard Customer
        </h1>

        <p className="text-slate-300 mb-10">
          Selamat datang, {user?.name} 👋
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg">
              Total Pesanan
            </h3>

            <p className="text-4xl font-bold mt-2">
              {totalOrders}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg">
              Total Pengeluaran
            </h3>

            <p className="text-3xl font-bold mt-2">
              Rp {totalSpent.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg">
              Status Terakhir
            </h3>

            <p className="text-3xl font-bold mt-2">
              {latestStatus}
            </p>
          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Buat Pesanan Laundry
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <select
  name="service_type"
  value={form.service_type}
  onChange={handleChange}
  className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
>
  <option value="">Pilih Layanan</option>
  <option value="Cuci Kering">Cuci Kering</option>
  <option value="Cuci Setrika">Cuci Setrika</option>
  <option value="Setrika Saja">Setrika Saja</option>
</select>

<input
  type="number"
  name="weight"
  placeholder="Berat (Kg)"
  value={form.weight}
  onChange={handleChange}
  className="bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-xl"
/>

<input
  type="text"
  value={`Rp ${Number(
    form.total_price
  ).toLocaleString("id-ID")}`}
  readOnly
  className="bg-slate-700 border border-slate-600 text-white p-3 rounded-xl"
/>
          </div>

          <button
            onClick={handleOrder}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl mt-5"
          >
            Buat Pesanan
          </button>

        </div>

        <div className="bg-slate-900 rounded-2xl shadow-lg p-6">

          <h2 className="text-3xl font-bold mb-6">
            Riwayat Pesanan
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-slate-800">
                  <th className="p-4">ID</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Layanan</th>
                  <th className="p-4">Berat</th>
                  <th className="p-4">Harga</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">QR</th>
                  <th className="p-4">Struk</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-700 hover:bg-slate-800 transition"
                  >
                    <td className="p-4">
                       {order.id}
                    </td>

                  <td className="p-4">
                      {order.created_at
  ? new Date(order.created_at).toLocaleString("id-ID")
  : "-"}
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
  <button
    onClick={() => showQr(order.id)}
    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
  >
    Lihat QR
  </button>
</td>
<td className="p-4">
  <button
    onClick={() => printReceipt(order)}
    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
  >
    🖨 Cetak
  </button>
</td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-6 text-slate-400"
                    >
                      Belum ada pesanan
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

<footer className="mt-10 border-t border-slate-800 pt-6 text-center text-slate-400">
  <p>
    © 2026 LaundryGo. All Rights Reserved.
  </p>

  <p className="mt-2 text-sm">
    Developed By Lydia & Indry
  </p>
</footer>

      </div>
    </div>

    {qrImage && (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

        <div className="bg-white p-6 rounded-2xl shadow-xl">

          <h2 className="text-black text-xl font-bold mb-4">
            QR Code Pesanan
          </h2>

          <img
            src={qrImage}
            alt="QR Code"
            className="w-64 h-64"
          />

          <button
            onClick={() => setQrImage(null)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Tutup
          </button>

        </div>

      </div>
    )}

  </>
);
}

export default Dashboard;
