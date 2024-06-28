import { FaEdit } from "react-icons/fa"; // If you're using react-icons

function InformationsUser() {
  return (
    <div className="bg-gray-800 rounded-lg p-9 space-y-9 flex flex-col justify-center items-center min-h-full">
      <h2 className="text-xl font-bold text-white">Information Dashboard</h2>
      <div className="grid grid-cols-2 gap-14 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="first-name"
          >
            First Name
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="first-name"
              type="text"
              value="Kaled"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="last-name"
              type="text"
              value="Guzman"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="city"
          >
            City
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              value="Madrid"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value="kaledguzman9@gmail.com"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value="kaledpassword"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="postal-code"
          >
            Postal code
          </label>
          <div className="relative w-full mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="postal-code"
              type="text"
              value="12345"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col ">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="dob"
          >
            Date of Birth
          </label>
          <div className="relative w-ful mt-2">
            <input
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="dob"
              type="date"
              value="2000-01-01"
              disabled
            />
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            className="text-lg text-[#21a89a] flex items-center justify-between w-full"
            htmlFor="gender"
          >
            Gender
          </label>
          <div className="relative w-full mt-2">
            <select
              className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="gender"
            >
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="Other">Other</option>
            </select>
            <FaEdit className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationsUser;
