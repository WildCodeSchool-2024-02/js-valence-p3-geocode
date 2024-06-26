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
          <h2 className="flex items-center gap-8 text-[#21A89A] text-[36px] mb-4">
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
        <div className="text-white absolute right-24 flex flex-col items-center h-[300px] w-[300px] bg-[#1E1F24] rounded-t-lg p-4">
          <h1 className="w-full mb-4 text-lg text-center border border-[#444] rounded py-1 ">
            Reserve your Terminal
          </h1>
          <div className="w-full mb-4">
            <h2 className="mb-2 text-sm">Date :</h2>
            <DatePicker />
          </div>
          <div className="flex w-full gap-20 pl-5 mb-10">
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-sm">Check In</h2>
              <TimePicker />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-sm">Check Out</h2>
              <TimePicker/>
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-black bg-[#7CD858] rounded font-semibold	"
          >
            Charge Now !
          </button>
        </div>
      </div>
    </div>
  );
}
