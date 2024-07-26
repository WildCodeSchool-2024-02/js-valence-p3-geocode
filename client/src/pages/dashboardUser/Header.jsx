import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../components/AuthContext";

function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white shadow-lg py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>{auth.userId}</span>
        <FaUserCircle className="text-2xl" />
      </div>
    </header>
  );
}

export default Header;
