import React, { useState } from "react";
import Head from "next/head";
import { FileTypeKey, fileTypes, icons } from "./fileTypes";

import Tabs from "@/components/tabs";
import DropdownTabs from "@/components/DropdownTabs";

export default function Home() {
  const [fileContent, setFileContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false); // 新增 complete 狀態

  const handleFileUpload = (file: File): void => {
    setErrorMessage("");
    setLoading(true);
    setComplete(false); // 重置完成狀態
    import("@/utils/upload")
      .then((module) => module.uploadPDF(file))
      .then((content: string) => {
        setFileContent(content);
        setComplete(true); // 設定完成狀態為 true
      })
      .catch((error: Error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) handleFileUpload(file);
  };

  const handleButtonClick = (): void => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "*";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (file) handleFileUpload(file);
    };
    fileInput.click();
  };

  const handleDownload = (): void => {
    if (!fileContent) {
      setErrorMessage("No content available for download.");
      return;
    }
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_text.txt";
    link.click();
  };

  const getButtonStyles = () => {
    if (loading) {
      return "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300"; // 轉換中顏色
    } else if (complete) {
      return "bg-green-500 hover:bg-green-600 focus:ring-green-300"; // 完成狀態顏色
    } else {
      return "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300"; // 預設狀態顏色
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Head>
        <title>AnyToText - File to Text Conversion</title>
        <meta
          name="description"
          content="Easily convert PDF, PowerPoint, Word, and other files to text using a drag-and-drop interface."
        />
      </Head>
      <aside className="hidden md:block w-1/12 bg-asideBg p-4 border-r border-borderGray m-2"></aside>

      <main className="flex-1 p-6">
        <center>
          <div className="text-4xl font-bold inline-flex items-center mb-6">
            AnyToText
            <img alt="logo" className="mt-4 w-8 h-8" src="../icon/com.svg" />
          </div>
          {/* <Tabs /> */}
        </center>

        <section
          className="p-6 bg-white rounded border border-borderGray"
          onDragOver={(e) => e.preventDefault()}
          onDrop={loading ? undefined : handleDrop}
        >
          <div className="text-center">
            <div className="p-4">
              {icons.map((icon) => {
                const { gradient, shadow, labelColor, borderColor, label } = fileTypes[icon as FileTypeKey];
                return (
                  <div
                    className="p-4 rounded-lg shadow-md border"
                    style={{
                      background: gradient,
                      boxShadow: shadow,
                      borderColor: borderColor,
                      width: "90px",
                      height: "110px",
                      display: "inline-block",
                      margin: "10px",
                    }}
                    key={icon}
                  >
                    <img
                      src={`../icon/${icon}.svg`}
                      alt={`${icon} icon`}
                      className="w-12 h-12 mb-2 m-auto"
                    />
                    <p
                      className="text-sm font-bold"
                      style={{ color: labelColor }}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="text-gray-700">
              <p className="mb-2 font-bold">Drag and drop files or click the upload button</p>
              <p className="text-sm">
                Currently supports PDF (.pdf), PowerPoint (.pptx), Word (.docx),
                Excel (.xlsx), images (EXIF/OCR), audio (EXIF/speech-to-text),
                web pages (HTML), and other text content
              </p>
            </div>
            <button
              className={`text-white py-2 px-4 rounded focus:outline-none focus:ring-2 ${getButtonStyles()} ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={loading ? undefined : handleButtonClick}
            >
              {loading
                ? "Converting..."
                : complete
                ? "Conversion Complete"
                : "Upload"}
            </button>
          </div>
        </section>

        {errorMessage && (
          <div className="mt-4 text-errorText">{errorMessage}</div>
        )}
        
        {fileContent && (
          <>
            <div className="flex justify-end items-end">
              <div className="p-1">Download as </div>
              <div className="p-1"><DropdownTabs tabs={[
                {
                  label: ".txt",
                  content: ".txt",
                }
              ]} /></div>
              <div className="p-1">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
              <div className="p-1">
                <button
                  className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-opacity-20"
                  onClick={() => {navigator.clipboard.writeText(fileContent)}}
                >
                  Copy Text
                </button>
              </div>
            </div>
            <article className="mt-4 p-4 bg-gray-50 border border-borderGray rounded shadow-inner" style={{ whiteSpace: 'pre-wrap' }}>
              {fileContent || "No content to display."}
            </article>
          </>
        )}

        <footer className="mt-8 text-gray-500 text-sm">
          Note: Conversion results may vary for files with complex layouts,
          images, or custom fonts.
        </footer>
      </main>
      <aside className="hidden md:block w-1/12 bg-asideBg p-4 border-r border-borderGray m-2"></aside>
    </div>
  );
}
