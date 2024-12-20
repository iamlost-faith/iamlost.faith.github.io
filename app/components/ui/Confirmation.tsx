import React from 'react';
import Popup from './Popup';

interface ButtonProps {
    isOpen: boolean;
    action: string;
    content: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
}

const Confirmation: React.FC<ButtonProps> = ({ isOpen, children, action, content, onConfirm, onClose }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    }
    return (
        <div>
            {children}
            <Popup isOpen={isOpen} onClose={onClose}>
                {content}
                <div className='flex space-x-2 mt-6'>
                    <button className="rounded-full text-gray-400 hover:text-red-600" type="button" onClick={handleConfirm}>
                        {action}
                    </button>
                    <button className="flex-grow bg-blue-500 text-white p-2 rounded-full hover:bg-lime-500" type="button" onClick={() => onClose()}>
                        Cancel
                    </button>
                </div>
            </Popup>
        </div>
    );
};

export default Confirmation;