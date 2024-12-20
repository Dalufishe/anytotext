import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/index/Sidebar";
import Header from "@/components/index/Header";
import FileUploadSection from "@/components/index/FileUploadSection";
import FileContentViewer from "@/components/index/FileContentViewer";
import APIKeyContainer from "@/components/index/APIKeyContainer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [APIKey, setAPIKey] = useState("");
  // setAPIKey("");

  const handleFileUpload = (file: File): void => {
    setLoading(true);
    setComplete(false);
    setErrorMessage("");

    import("@/utils/upload")
      .then((module) => module.uploadPDF(file, APIKey))
      .then((content: string) => {
        setFileContent(content);
        setLoading(false);
        setComplete(true);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setLoading(false);
        setComplete(false);
      });
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Head>
        <title>AnyToText - File to Text Conversion</title>
        <meta
          name="description"
          content="Easily convert PDF, PowerPoint, Word, and other files to text using a drag-and-drop interface."
        />
      </Head>
      <Sidebar />
      <main className="flex-1 p-6">
        {/* APIKey 元件 */}
        <APIKeyContainer
          isVisible={isVisible}
          APIKey={APIKey}
          onToggle={() => setIsVisible(!isVisible)}
          onAPIKeyContainerChange={(key: string) => setAPIKey(key)}
        />
        {/* Header */}
        <Header />
        {/* File Upload Section */}
        <FileUploadSection
          loading={loading}
          complete={complete}
          onUploadClick={handleButtonClick}
          onFileDrop={handleDrop}
        />
        {/* Error Message */}
        {errorMessage && <div className="mt-4 text-errorText">{errorMessage}</div>}
        {/* File Content Viewer */}
        {fileContent && (
          <FileContentViewer
            fileContent={fileContent}
            onDownload={handleDownload}
            onCopy={() => navigator.clipboard.writeText(fileContent)}
          />
        )}
      </main>
      <Sidebar />
    </div>
  );
}
