import React from 'react';

const Header: React.FC = () => (
    <header className="bg-gray-200 dark:bg-gray-700 p-4 shadow-md mb-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Project Portfolio</h1>
            <nav>
                <a href="/" className="text-blue-500 hover:underline">
                    Home
                </a>
            </nav>
        </div>
    </header>
);

export default Header;
