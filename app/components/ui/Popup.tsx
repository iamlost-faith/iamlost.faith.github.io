// components/Popup.tsx
import { XMarkIcon } from '@heroicons/react/16/solid';
// components/Popup.tsx
import React, { useEffect } from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto max-w-[90vw] max-h-[90vh] overflow-auto">
                <div className="flex justify-end mb-4">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={onClose}
                    >
                        <XMarkIcon className='size-6' />
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : null;
};

export default Popup;