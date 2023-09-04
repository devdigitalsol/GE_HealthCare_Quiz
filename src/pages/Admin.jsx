import axios from "axios";
import { useEffect, useState } from "react";
import Tableview from "../components/Tableview";
import MAINLOGO from "./../images/main_logo.png";

export default function Admin() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const resp = await axios.post("https://api.torstenmonth.com/index.php", {
        operation: "get_all_radiologist",
      });
      console.log(resp.data.radiologist);
      setData(resp.data.radiologist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-6">
      <div className="bg-white">
        <div className="flex gap-2 items-center p-4">
          <img src={MAINLOGO} alt="logo" className="w-20" />
          <h4>Admin | Torstenmonth</h4>
        </div>
        <Tableview data={data.reverse()} />
      </div>
    </div>
  );
}
