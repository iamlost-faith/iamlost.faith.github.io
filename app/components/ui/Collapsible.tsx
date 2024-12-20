import React, { useState } from 'react';

interface CollapsibleProps {
    children: React.ReactNode;
    outterText: string;
    open?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ children, outterText, open = false }) => {
    const [isOpen, setIsOpen] = useState(open);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full bg-white shadow-md rounded-lg">
            <div
                className="flex justify-between items-center px-6 py-2 bg-gray-100 rounded-t-lg cursor-pointer"
                onClick={toggleCollapsible}
            >
                <h3 className="font-medium text-gray-800">{outterText}</h3>
                <button className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="p-6">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;