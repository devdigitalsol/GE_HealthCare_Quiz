import MAINLOGO from "./../images/main_logo.png";
import CONTEST from "./../images/contest.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";
export default function Intro() {
  const { info } = useContext(AppContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (!info) {
      navigate("/");
    }
  }, [info, navigate]);
  if (info) {
    return (
      <>
        <div className="mx-auto w-36">
          <img src={MAINLOGO} alt="logo" />
        </div>
        <div className="mx-auto w-60">
          <img src={CONTEST} alt="contest" />
        </div>
        <div className="px-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg overflow-hidden mt-3">
            <h4 className="text-primary text-xl text-center mb-2">
              Insturction :{" "}
            </h4>
            <ul className="list-decimal pl-4">
              <li>
                Ten MCQ questions will be asked to the participant based on
                contrast media in radiology.
              </li>
              <li>
                Participant will be able to download the certificate on the
                successfull attempt of the quiz
              </li>
            </ul>
            <div className="flex items-center justify-center mt-2">
              <Link
                to="/quiz"
                className="btn w-full text-center uppercase text-xl"
              >
                Play
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
