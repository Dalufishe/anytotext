import React from "react";
import DownloadType from "@/components/index/DownloadType";
import Button from "./Button";

// 定義檔案內容區塊的屬性類型
type FileContentBlock = {
  id: string;               // 每個區塊唯一 ID
  content: string;          // 區塊內容
};

// 定義主元件的 Props 類型
type FileContentViewerProps = {
  contentBlocks: FileContentBlock[]; // 多個內容區塊
  onDownload: (id: string) => void;  // 根據區塊 ID 下載內容
  onCopy: (id: string) => void;      // 根據區塊 ID 複製內容
};

// 主元件
const FileContentViewer: React.FC<FileContentViewerProps> = ({
  contentBlocks,
  onDownload,
  onCopy,
}) => {
  return (
    <div>
      {/* 遍歷每個內容區塊 */}
      {contentBlocks.map((block) => (
        <section key={block.id} className="mb-6">
          {/* 操作按鈕 */}
          <div className="flex justify-end items-end mb-2">
            <div className="p-1">Download as </div>
            <div className="p-1">
              <DownloadType
                tabs={[
                  {
                    label: ".txt",
                    content: ".txt",
                  },
                ]}
              />
            </div>
            <div className="p-1">
              <Button
                styleType="complete"
                onClick={() => onDownload(block.id)} // 傳遞區塊 ID
                label="Download"
              />
            </div>
            <div className="p-1">
              <Button
                styleType="normal"
                onClick={() => onCopy(block.id)} // 傳遞區塊 ID
                label="Copy Text"
              />
            </div>
          </div>

          {/* 內容區塊 */}
          <article
            className="text-textBody border rounded border-borderGray p-4"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {block.content}
          </article>
        </section>
      ))}
    </div>
  );
};

export default FileContentViewer;
