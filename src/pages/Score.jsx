import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MAINLOGO from "./../images/main_logo.png";
import THANKYOU from "./../images/thank_you.png";
import { AppContext } from "../context";
import Loading from "../components/Loading";
export default function Score() {
  const navigate = useNavigate();
  const { info, generatePhoto, isLoading } = useContext(AppContext);
  useEffect(() => {
    if (!info) {
      navigate("/");
    }
  }, [info, navigate]);
  const uploadPhoto = () => {
    const checkphoto = generatePhoto();
    if (checkphoto) {
      navigate("/preview");
    }
  };
  if (info) {
    return (
      <>
        <div className="w-44 mx-auto">
          <img src={MAINLOGO} alt="logo" />
        </div>
        <div className="w-64 mx-auto">
          <img src={THANKYOU} alt="thankyou" />
        </div>
        <div className="bg-white rounded-lg border-slate-100 border shadow-lg p-4 text-center flex items-center justify-center flex-col gap-2">
          <h4 className="text-primary font-semibold">Your score is</h4>
          <div className="text-primary text-2xl font-bold">{info.score}/10</div>
          <p className="text-primary">Download your certificate here</p>
          <button onClick={uploadPhoto} className="btn w-full">
            Generate
          </button>
        </div>
        <Loading isLoading={isLoading} />
      </>
    );
  }
}
