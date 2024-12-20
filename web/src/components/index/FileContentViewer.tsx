import React from "react";
import DownloadType from "@/components/index/DownloadType";
import Button from "./Button";

type FileContentViewerProps = {
  fileContent: string;
  onDownload: () => void;
  onCopy: () => void;
};

const FileContentViewer: React.FC<FileContentViewerProps> = ({
  fileContent,
  onDownload,
  onCopy,
}) => {
  return (
    <>
      <div className="flex justify-end items-end mt-4">
        <div className="p-1">Download as </div>
        <div className="p-1">
          <DownloadType
            tabs={[
              {
                label: ".txt",
                content: ".txt",
              },
              // {
              //   label: ".md",
              //   content: ".md",
              // },
            ]}
          />
        </div>
        <div className="p-1">
          <Button styleType='complete' onClick={onDownload} label="Download" />
        </div>
        <div className="p-1">
          <Button styleType='normal' onClick={onCopy} label="Copy Text" />
        </div>
      </div>
      <article
        className="mt-4 text-textBody border rounded border-borderGray p-4"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {fileContent}
      </article>
    </>
  );
};

export default FileContentViewer;
