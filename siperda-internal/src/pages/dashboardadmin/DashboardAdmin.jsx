import DashboardCard from "../../components/DashboardCard";
import TableLaporan from "../../components/TableLaporan";
import { laporan } from "../../data/laporan";

function DashboardStaf() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Dashboard Staf Inspektorat</h1>

      {/* CARD */}
      <div className="grid grid-cols-4 gap-5 mb-10">
        <DashboardCard
          title="Total Laporan"
          total="126"
          color="text-blue-700"
        />

        <DashboardCard
          title="Laporan Masuk"
          total="28"
          color="text-yellow-500"
        />

        <DashboardCard title="Diproses" total="62" color="text-purple-500" />

        <DashboardCard title="Selesai" total="34" color="text-green-500" />
      </div>

      {/* TABLE */}
      <TableLaporan data={laporan} />
    </div>
  );
}

export default DashboardStaf;
