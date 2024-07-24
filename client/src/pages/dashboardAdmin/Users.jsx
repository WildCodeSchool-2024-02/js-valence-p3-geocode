import TableData from "../../components/TableData";

export default function Users() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl">Table of all your users registered!</h1>

      <TableData />
    </div>
  );
}
