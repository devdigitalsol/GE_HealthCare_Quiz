import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { urltoFile } from "../utils";
export const AppContext = createContext(null);

export const AppState = ({ children }) => {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState();
  const generatePhoto = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, */*",
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let file = await urltoFile(info?.photo, "image.png");
      let fd = new FormData();
      fd.append("upload_file", file);
      const resp = await axios.post(
        "https://vps.solmc.in/sketch/sketch.php",
        fd,
        config
      );
      if (resp?.data?.status === 200) {
        setInfo((prev) => {
          return { ...prev, generated_photo_url: resp?.data?.filename };
        });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const store = {
    info,
    setInfo,
    generatePhoto,
    isLoading,
    setIsLoading,
    identifier,
    setIdentifier,
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
