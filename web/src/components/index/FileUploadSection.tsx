import React from "react";
import { FileTypeKey, fileTypes } from "@/components/index/fileTypes"; // 確保已引入 fileTypes 和 FileTypeKey
import Button from "@/components/index/Button";

// 定義 FileUploadSection 的 Props 類型
type FileUploadSectionProps = {
  loading: boolean;
  complete: boolean;
  onUploadClick: () => void;
  onFileDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  loading,
  complete,
  onUploadClick,
  onFileDrop,
}) => {
  return (
    <section
      className="p-6 bg-white rounded border border-borderGray"
      onDragOver={(e) => e.preventDefault()} // 拖曳時不會有預設動作
      onDrop={loading ? undefined : onFileDrop} // 若正在加載則禁止 drop 事件
    >
      <div className="text-center">
        <div className="p-4">
          {/* 繪製每個檔案類型的圖標與樣式 */}
          {Object.keys(fileTypes).map((icon) => {
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
                  src={`../icon/${icon}.svg`} // 假設每個檔案類型有對應的圖示
                  alt={`${icon} icon`}
                  className="w-12 h-12 mb-2 m-auto"
                />
                <p className="text-sm font-bold" style={{ color: labelColor }}>
                  {label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-gray-700">
          <p className="mb-2 font-bold">Drag and drop files or click the upload button</p>
          <p className="text-sm">
            Currently supports PDF (.pdf), PowerPoint (.pptx), Word (.docx), Excel (.xlsx), images
            (EXIF/OCR), audio (EXIF/speech-to-text), web pages (HTML), and other text content
          </p>
        </div>
        <div className="pt-6">
          <Button
            label={loading ? "Converting..." : complete ? "Conversion Complete" : "Upload"}
            onClick={onUploadClick}
            isDisabled={loading}
            styleType={loading ? "converting" : complete ? "complete" : "default"}
          />
        </div>
      </div>
    </section>
  );
};

export default FileUploadSection;
