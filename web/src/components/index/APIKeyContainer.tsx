import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import Button from "./Button";

type APIKeyContainerProps = {
  isVisible: boolean;
  APIKey: string;
  onToggle: () => void;
  onAPIKeyContainerChange: (key: string) => void;
};

const APIKeyContainer: React.FC<APIKeyContainerProps> = ({
  isVisible,
  APIKey,
  onToggle,
  onAPIKeyContainerChange,
}) => {
  return (
      <div className="absolute top-0 right-0 text-right w-auto">
        <button className="relative group py-2 px-4 rounded-lg">
          {/* API Key Icon */}
          <div onClick={onToggle} className="cursor-pointer flex items-center">
            <div className="inline-block">API Key</div>
            <div className="text-center inline-block w-5 h-5 ml-1">
              <FaCircleQuestion />
            </div>
          </div> 
          {/* API Key Tip */}
          {!isVisible && (
            <span className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black bg-white p-2 rounded-lg whitespace-nowrap max-w-lg border border-opacity-20 dialog-up">
              Image and audio text conversion requires OpenAI API Key
            </span>
          )}
        </button>

        {/* API KEY Input Container */}
        {isVisible && (
          <div id="API-KEY-Container" className="flex flex-row items-center mt-2 space-x-2 bg-white p-2 border-black border-opacity-20 rounded drop-shadow dialog-up">
            <input
              id="API-KEY"
              type="text"
              value={APIKey}
              onChange={(e) => onAPIKeyContainerChange(e.target.value)}
              placeholder="Enter OpenAI API Key..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-security"
            />
            <Button styleType="normal" onClick={onToggle} isDisabled={false} label="Confirm"></Button>
          </div>
        )}
      </div>
  );
};

export default APIKeyContainer;
