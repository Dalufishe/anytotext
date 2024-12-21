import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center mb-6">
      <h1 className="text-4xl font-bold inline-flex items-center">
        AnyToText
        <img alt="logo" className="mt-5 w-10" src="../icon/com.svg" />
      </h1>
    </header>
  );
};

export default Header;
