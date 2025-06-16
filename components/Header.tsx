
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 bg-sky-600 text-white shadow-md">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Ikigai Explorer</h1>
        <p className="mt-2 text-lg text-sky-100">Find Your Reason for Being</p>
      </div>
    </header>
  );
};

export default Header;
