import React, { useState } from "react";
import { uploadPDF } from "@/utils/upload";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSanitize from "rehype-sanitize";
import Head from "next/head";

export default function Home() {
  const [fileContent, setFileContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // 新增 loading 狀態

  const handleFileUpload = (file) => {
    setErrorMessage("");
    setLoading(true); // 開啟 loading
    uploadPDF(file)
      .then((content) => {
        setFileContent(content);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false); // 結束後關閉 loading
      });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleButtonClick = (event) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "*"; // 允許所有檔案
    fileInput.onchange = (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        handleFileUpload(file);
      }
    };
    fileInput.click();
  };

  const handleDownload = () => {
    const blob = new Blob([fileContent || "No content to download."], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_text.txt";
    link.click();
  };

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "20px",
        margin: "0 auto", // 讓內容置中
        maxWidth: "1200px", // 設定最大寬度，避免內容過寬
        boxSizing: "border-box", // 確保 padding 不會影響實際寬度
      }}
    >
      <style>
        {`
      main {
        padding-left: 20px;
        padding-right: 20px;
      }

      @media (max-width: 1200px) {
        main {
          padding-left: 40px;
          padding-right: 40px;
        }
      }

      @media (max-width: 768px) {
        main {
          padding-left: 20px;
          padding-right: 20px;
        }
      }

      @media (max-width: 480px) {
        main {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    `}
      </style>
      <Head>
        <title>
          Any To Text - Easily convert PDF, PowerPoint, and Word files to text
          with our drag-and-drop interface.
        </title>
        <meta
          name="description"
          content="Easily convert PDF, PPT, and DOC files to text with our user-friendly drag-and-drop interface. No content lost, fast and accurate."
        />
        <meta
          name="keywords"
          content="PDF to text, PPT to text, DOC to text, file conversion, text extraction"
        />
        <meta name="author" content="Your Name or Company" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">
          {`{
  "@context": "https://anytotext.com",
  "@type": "SoftwareApplication",
  "name": "Any To Text",
  "description": "Easily convert PDF, PPT, and DOC files to text with our drag-and-drop interface.",
  "applicationCategory": "Utility",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}`}
        </script>
      </Head>
      <header>
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Any To Text
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          Convert PDF, PPT, DOC to Text Easily and Quickly
        </h2>
      </header>
      <section
        style={{
          border: "2px dashed gray",
          borderRadius: "10px",
          padding: "40px",
          textAlign: "center",
          marginBottom: "20px",
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={loading ? () => {} : handleDrop}
      >
        <p style={{ marginBottom: "16px" }}>
          {loading
            ? "Processing... Please wait..."
            : "Drag and drop a file here to upload"}
        </p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            border: "none",
          }}
          onClick={loading ? () => {} : handleButtonClick}
        >
          Upload File
        </button>
      </section>

      {errorMessage && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}
      {fileContent && (
        <>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                border: "none",
                textAlign: "center",
              }}
              onClick={handleDownload}
            >
              Download Text File
            </button>
          </div>
          <article
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "16px",
              minHeight: "100px",
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {fileContent || "No content to display."}
            </div>
          </article>
        </>
      )}
      <footer>
        <small>
          <p
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: "14px",
              marginTop: "20px",
            }}
            aria-label="Disclaimer: Conversion accuracy notice"
          >
            Note: File conversion results may vary from the original content.
            This is particularly true for files with complex layouts, images, or
            custom fonts.
            {/* 轉換結果可能與原始檔案中的內容有所不同，特別是涉及到複雜排版、圖片或特殊字型的檔案。 */}
          </p>
        </small>
      </footer>
    </main>
  );
}
