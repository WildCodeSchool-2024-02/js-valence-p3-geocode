import TableData from "../../components/TableData/TableDataUsers";

export default function Users() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <h1 className="text-3xl font-bold">Table of All Registered Users</h1>
      <TableData />
    </div>
  );
}
