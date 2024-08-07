import { FaLinkedin, FaSearch, FaInstagram, FaTwitter } from "react-icons/fa";

function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 text-white bg-gray-900">
      <div className="grid w-full grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2">
        <div className="flex flex-col justify-between max-w-md">
          <h1 className="text-8xl mb-4 font-bold text-[#BDC2CC]">Contact</h1>
          <p className="text-lg mb-8 text-[#BDC2CC]">
            If you need help or some informations that you can't find on our
            website, don't hesitate! Send us a mail and we will respond as fast
            as possible.
          </p>
          <div className="flex space-x-6">
            <FaLinkedin className="text-4xl" />
            <FaSearch className="text-4xl" />
            <FaInstagram className="text-4xl" />
            <FaTwitter className="text-4xl" />
          </div>
        </div>
        <div>
          <form className="p-8 space-y-4 rounded-lg shadow-md ">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:#21a89a"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:#21a89a"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:#21a89a"
            />
            <input
              type="text"
              placeholder="Object of the mail"
              className="w-full p-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:#21a89a"
            />
            <textarea
              placeholder="Your message here..."
              className="w-full p-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:#21a89a"
              rows="5"
            />
            <button
              type="submit"
              className="w-full p-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="flex items-center justify-center">
                <FaSearch className="mr-2" />
                Send Message
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
