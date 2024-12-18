import React, { useState } from "react";
import Head from "next/head";
import { FileTypeKey, fileTypes, icons } from "./fileTypes";
import { styles } from "./styles";

export default function Home() {
  const [fileContent, setFileContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = (file: File): void => {
    setErrorMessage("");
    setLoading(true);
    import("@/utils/upload")
      .then((module) => module.uploadPDF(file))
      .then((content: string) => setFileContent(content))
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

  return (
    <div style={styles.container}>
      <aside className="aside"></aside>
      <main style={styles.main}>
        <Head>
          <title>AnyToText - File to Text Conversion</title>
          <meta
            name="description"
            content="Easily convert PDF, PowerPoint, Word, and other files to text using a drag-and-drop interface."
          />
        </Head>

        <header style={styles.header}>
          <h1 style={styles.title}>
            AnyToText
            <img
              src="../icon/com.svg"
              alt="logo"
              style={{
                marginLeft: "-10px", // Spacing between text and image
                width: "40px",
                height: "40px",
              }}
            />
          </h1>
        </header>

        <section
          style={styles.section}
          onDragOver={(e) => e.preventDefault()}
          onDrop={loading ? undefined : handleDrop}
        >
          <div style={styles.section_main}>
            <div style={styles.iconContainer}>
              {icons.map((icon) => {
                const { gradient, shadow, labelColor, borderColor, label } = fileTypes[icon as FileTypeKey];
                return (
                  <div
                    style={{
                      ...styles.imgContainer,
                      background: gradient,
                      boxShadow: shadow,
                      borderColor: borderColor,
                    }}
                    key={icon}
                  >
                    <img
                      src={`../icon/${icon}.svg`}
                      alt={`${icon} icon`}
                      style={styles.imgIcon}
                    />
                    <p style={{ ...styles.iconLabel, color: labelColor }}>{label}</p>
                  </div>
                );
              })}
            </div>
            <div style={styles.textInfo}>
              <div style={styles.uploadText}>
                Drag and drop files or click the upload button
              </div>
              <div style={styles.supportedText}>
                Currently supports PDF (.pdf), PowerPoint (.pptx), Word (.docx), Excel (.xlsx), images (EXIF/OCR),
                audio (EXIF/speech-to-text), web pages (HTML), and other text content
              </div>
            </div>
            <button
              style={{ ...styles.button, ...styles.uploadButton }}
              onClick={loading ? undefined : handleButtonClick}
            >
              {loading ? "Processing... Please wait..." : "Upload"}
            </button>
          </div>
        </section>

        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

        {fileContent && (
          <>
            <div style={styles.downloadContainer}>
              <button
                style={{ ...styles.button, ...styles.downloadButton }}
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
            <article style={styles.article}>
              {fileContent || "No content to display."}
            </article>
          </>
        )}

        <footer style={styles.footer}>
          Note: Conversion results may vary for files with complex layouts, images, or custom fonts.
        </footer>
      </main>
      <aside className="aside"></aside>

      <style jsx>{`
        .aside {
          background-color: #d9d9d9;
          padding: 10px;
          border-right: 1px solid #ccc;
          box-sizing: border-box;
          width: 10%;
        }

        @media (max-width: 768px) {
          .aside {
            display: none;
            max-width: 200px;
          }

          .main {
            margin: 0 10%;
          }
        }
      `}</style>
    </div>
  );
}
