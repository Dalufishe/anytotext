import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/index/Sidebar";
import Header from "@/components/index/Header";
import FileUploadSection from "@/components/index/FileUploadSection";
import FileContentViewer from "@/components/index/FileContentViewer";
import APIKeyContainer from "@/components/index/APIKeyContainer";
import I18nSelector from "@/components/index/I18nSelector";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [APIKey, setAPIKey] = useState("");

  // 初始化時從 localStorage 獲取 APIKey
  useEffect(() => {
    const storedKey = localStorage.getItem("APIKey");
    if (storedKey) {
      setAPIKey(storedKey);
    }
  }, []);

  // 每當 APIKey 改變時，同步更新到 localStorage
  useEffect(() => {
    if (APIKey) {
      localStorage.setItem("APIKey", APIKey);
    }
  }, [APIKey]);

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
        <title>AnyToText - File to Text Conversion Online</title>
        <meta
          name="description"
          content="Convert PDF, PPT, Word, and image files to text easily and accurately with our drag-and-drop tool. Fast, free, and reliable text extraction for everyone."
        />
        <meta
          name="keywords"
          content="PDF to text, PPT to text, Word to text, image to text, file conversion, text extraction, online file converter"
        />
        <meta name="author" content="Dalufishe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">
          {`{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Any To Text",
  "description": "Easily convert PDF, PPT, Word, and image files to text with our drag-and-drop tool. Free, fast, and reliable text extraction for all your needs.",
  "applicationCategory": "Utility",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "keywords": [
    "PDF to text",
    "PPT to text",
    "Word to text",
    "image to text",
    "file conversion",
    "text extraction",
    "online file converter"
  ]
}`}
        </script>
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
        {/* Title */}
        <Header />
        {/* I18n Selector */}
        {/* <I18nSelector/> */}
        {/* File Upload Section */}
        <FileUploadSection
          loading={loading}
          complete={complete}
          onUploadClick={handleButtonClick}
          onFileDrop={handleDrop}
        />
        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-errorText">{errorMessage}</div>
        )}
        {/* File Content Viewer */}
        {fileContent && (
          <FileContentViewer
            fileContent={fileContent}
            onDownload={handleDownload}
            onCopy={() => navigator.clipboard.writeText(fileContent)}
          />
        )}
        <footer className="mt-8 text-gray-500 text-sm flex flex-col justify-center items-center text-center">
          {/* <p>
            Note: Conversion results may vary for files with complex layouts,
            images, or custom fonts.
          </p> */}
          <p>
            Developed by{" "}
            <a
              href="https://github.com/Dalufishe"
              className="underline"
              target="_blank"
            >
              Dalufishe
            </a>{" "}
            &{" "}
            <a
              href="https://github.com/CatTimothy"
              className="underline"
              target="_blank"
            >
              CatTimothy
            </a>
            , designed by{" "}
            <a href="" className="underline" target="_blank">
              2O48
            </a>
            . For inquiries, please report issues or give feedback here:{" "}
            <a
              href="https://github.com/Dalufishe/anytotext/issues"
              className="underline"
              target="_blank"
            >
              GitHub Issues
            </a>
            . Thanks!
          </p>
          <p>
            Powered by{" "}
            <a
              href="https://github.com/microsoft/markitdown"
              className="underline"
              target="_blank"
            >
              MarkItDown
            </a>
            , , an open-source library by Microsoft for converting files like
            PDFs, Word documents, PowerPoints, images (OCR), and more into
            Markdown format.
          </p>
        </footer>
      </main>
      <Sidebar />
    </div>
  );
}
