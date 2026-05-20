function TableLaporan({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Nama</th>

            <th className="p-3 text-left">Jenis</th>

            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.nama}</td>

              <td className="p-3">{item.jenis}</td>

              <td className="p-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLaporan;
