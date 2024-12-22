import React, { useState } from "react";
import { FileTypeKey, fileTypes } from "@/components/index/fileTypes"; // 確保已引入 fileTypes 和 FileTypeKey
import Button from "@/components/index/Button";

// 定義 Props 類型
type FileUploadSectionProps = {
  loading: boolean;
  complete: boolean;
  onUploadClick: (files: File[]) => void; // 支援多檔案上傳
  onFileDrop: (files: File[]) => void; // 支援拖曳多檔案上傳
};

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  loading,
  complete,
  onUploadClick,
  onFileDrop,
}) => {
  // 新增狀態用於儲存已選擇的檔案
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 處理檔案選擇
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files); // 轉換為陣列
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // 累加已選檔案
    }
  };

  // 處理拖曳檔案
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && !loading) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // 累加檔案
      onFileDrop(newFiles); // 通知父元件
    }
  };

  // 處理檔案上傳
  const handleUploadClick = () => {
    onUploadClick(selectedFiles); // 將所有選擇的檔案上傳
  };

  return (
    <section
      className="p-6 bg-white rounded border border-borderGray"
      onDragOver={(e) => e.preventDefault()} // 禁用預設拖曳效果
      onDrop={handleFileDrop} // 支援拖曳多檔案上傳
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
            Supports PDF (.pdf), PowerPoint (.pptx), Word (.docx), Excel (.xlsx), images (EXIF/OCR),
            audio (EXIF/speech-to-text), web pages (HTML), and other text content
          </p>
        </div>
        {/* 上傳按鈕 */}
        <div className="pt-6">
          {/* 隱藏檔案選擇按鈕 */}
          <input
            type="file"
            multiple // 支援多檔案選取
            onChange={handleFileSelection} // 處理檔案選擇
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button
              label={loading ? "Uploading..." : complete ? "Upload Complete" : "Select Files"}
              onClick={handleUploadClick} // 上傳選擇的檔案
              isDisabled={loading} // 禁用按鈕條件
              styleType={loading ? "converting" : complete ? "complete" : "default"}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default FileUploadSection;
