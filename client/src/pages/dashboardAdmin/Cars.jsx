import TableDataCars from "../../components/TableData/TableDataCars";

export default function Cars() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <h1 className="text-3xl font-bold">Table of All Registered Cars</h1>
      <TableDataCars />
    </div>
  );
}
