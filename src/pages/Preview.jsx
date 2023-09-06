import { useContext, useEffect } from "react";
import CERTIFICATE from "./../images/certificate.jpg";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
import download from "downloadjs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";
import Loading from "../components/Loading";
export default function Preview() {
  const navigate = useNavigate();
  const { info, identifier, isLoading, setIsLoading } = useContext(AppContext);

  let myPdf = "certificate.pdf";
  useEffect(() => {
    if (!info) {
      navigate("/");
    }
  }, [info, navigate]);
  const backToHome = () => {
    window.location.reload();
  };
  function roundedImage(ctx) {
    ctx.beginPath();
    ctx.arc(512 / 2, 512 / 2, 512 / 2, 0, Math.PI * 2, false);
  }

  const downloadPDF = async () => {
    let pdfPhoto = "";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "";
    img.src = info?.generated_photo_url;
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      roundedImage(ctx, 0, 0, 512, 512, 512 / 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, 512, 512);
      pdfPhoto = canvas.toDataURL("image/png");
    };
    const existingPdfBytes = await fetch(myPdf).then((res) =>
      res.arrayBuffer()
    );
    const pngImageBytes = await fetch(pdfPhoto).then((res) =>
      res.arrayBuffer()
    );
    const radiologistText = info?.radiologistname;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const textWidth = helveticaBold.widthOfTextAtSize(radiologistText, 22);
    firstPage.drawImage(pngImage, {
      x: (firstPage.getWidth() - 131) / 2,
      y: 309,
      width: 131,
      height: 131,
    });
    firstPage.drawText(radiologistText, {
      x: (firstPage.getWidth() - textWidth) / 2,
      y: 268,
      font: helveticaBold,
      color: rgb(0.39, 0, 0.62),
    });
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "pdf.pdf", "application/pdf");
    uploadPdf(pdfBytes);
  };

  const uploadPdf = async (pdf) => {
    const config = {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, */*",
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      setIsLoading(true);
      let fd = new FormData();
      fd.append(
        "upload_file",
        new Blob([pdf], { type: "application/pdf" }),
        "pdf.pdf"
      );
      const resp = await axios.post(
        "https://api.torstenmonth.com/file_upload.php",
        fd,
        config
      );
      if (resp?.data?.status === 200) {
        updateScoreAndPdf(resp.data.filename);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateScoreAndPdf = async (pdfUrl) => {
    try {
      setIsLoading(true);
      const resp = await axios.post("https://api.torstenmonth.com/index.php", {
        operation: "update_score_and_pdf_url",
        identifier: identifier,
        score: info.score,
        pdf_url: pdfUrl,
      });
      if (resp?.data?.status === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (info) {
    return (
      <>
        <div className="w-72 relative">
          <div className="rounded-full overflow-hidden w-[70px] absolute top-[212px] mx-auto left-0 right-0">
            <img src={info.generated_photo_url} alt={info.radiologistname} />
          </div>
          <div className="text-primary absolute left-0 right-0 mx-auto text-center top-[288px] text-sm font-semibold">
            {info.radiologistname}
          </div>
          <img src={CERTIFICATE} alt="certificate" />
        </div>
        <div className="flex gap-3 mt-3">
          <button className="btn" onClick={backToHome}>
            Home
          </button>
          <button className="btn" onClick={downloadPDF}>
            Download
          </button>
        </div>
        <Loading isLoading={isLoading} />
      </>
    );
  }
}
