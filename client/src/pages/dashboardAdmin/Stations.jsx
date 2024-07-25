import TableDataStations from "../../components/TableData/TableDataStations";

export default function Stations() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <h1 className="text-3xl font-bold">Table of All Registered Stations</h1>
      <TableDataStations />
    </div>
  );
}
