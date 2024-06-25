import { localisation, slogan } from "../constant/LandingPageConstant";
import { background, bar, position, station } from "../assets/index";
import { DatePicker, TimePicker } from "../components/index";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div>
        <img
          src={background}
          alt="background"
          className="absolute object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-65" />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-end">
        <div className="mb-20 ml-24 text-white">
          <h2 className="flex items-center gap-8 text-[36px] mb-4">
            <img src={position} alt="position" className="w-8 h-8" />
            {localisation[0].partA}
            <img src={bar} alt="bar lateral" className="h-8" />
            <img src={station} alt="station" className="w-8 h-8" />
            {localisation[0].partB}
          </h2>
          <h1 className="text-[64px]">
            {slogan[0].partA}
            <br />
            {slogan[0].partB}
          </h1>
        </div>
        <div className="text-white absolute right-24 flex flex-col items-end h-[300px] w-[400px] bg-[#1E1F24] rounded-t-lg">
          <h1 className="text-left py-4 h-full w-full">
            Reserve your Terminal
          </h1>
          <div>
            <h2>Choose your date :</h2>
            <DatePicker />
          </div>
          <div>
            <div>
              <h2>Check In</h2>
              <TimePicker />
            </div>
            <div>
              <h2>Check Out</h2>
              <TimePicker />
            </div>
          </div>
          <div>
            <button type="button" className='bg-green-500'> Charge Now ! </button>
          </div>
        </div>
      </div>
    </div>
  );
}
