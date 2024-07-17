import LogIn from "../components/LogIn";
import Register from "../components/Register";

export default function Sign() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className=''>
        <div className="flex items-center justify-center space-x-8">
          <LogIn />
          <Register />
        </div>
      </div>
    </section>
  );
}
