import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center mb-6">
      <div className="text-4xl font-bold inline-flex items-center">
        AnyToText
        <img alt="logo" className="mt-4 w-10 h-10" src="../icon/com.svg" />
      </div>
    </header>
  );
};

export default Header;
