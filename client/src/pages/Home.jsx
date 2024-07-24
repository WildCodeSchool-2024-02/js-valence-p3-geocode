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
      </div>
    </div>
  );
}
