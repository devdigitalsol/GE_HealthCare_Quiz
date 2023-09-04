import { Outlet } from "react-router-dom";
import MAINLOGO from "./../../images/main_logo.png";
import BOTTOMLOGO from "./../../images/bottom_logo.png";
import "../../utils/app.css";

export default function Layout1() {
  return (
    <div className="max-w-md mx-auto min-h-full layout1 flex flex-col items-center justify-around">
      <div className="mx-auto w-36 p-4">
        <img src={MAINLOGO} alt="logo" />
      </div>
      <Outlet />
      <div className="mx-auto w-full">
        <img src={BOTTOMLOGO} alt="logo" />
      </div>
      {/* <p className=" absolute bottom-0 text-xs font-thin ">JB00326BS</p> */}
      <p className=" absolute bottom-0  text-small text-white font-extralight">
        JB00326BS
      </p>
    </div>
  );
}
