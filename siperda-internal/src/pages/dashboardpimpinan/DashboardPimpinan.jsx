import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { bulan: "Jan", laporan: 20 },
  { bulan: "Feb", laporan: 35 },
  { bulan: "Mar", laporan: 28 },
  { bulan: "Apr", laporan: 50 },
  { bulan: "Mei", laporan: 45 },
  { bulan: "Jun", laporan: 62 },
];

const pieData = [
  {
    name: "Diproses",
    value: 62,
  },
  {
    name: "Selesai",
    value: 34,
  },
  {
    name: "Ditolak",
    value: 2,
  },
];

function DashboardPimpinan() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Dashboard Pimpinan</h1>

          <p className="text-gray-500 mt-2">Ringkasan laporan pegawai</p>
        </div>
      </div>

      {/* chart */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {/* line chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="font-semibold text-xl mb-5">Trend Laporan</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="bulan" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="laporan"
                stroke="#2563eb"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* pie */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="font-semibold text-xl mb-5">Status Laporan</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                <Cell fill="#2563eb" />

                <Cell fill="#22c55e" />

                <Cell fill="#ef4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardPimpinan;
