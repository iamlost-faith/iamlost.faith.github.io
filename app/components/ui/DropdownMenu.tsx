import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
    onDelete: () => void;
    onEdit: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative text-left" ref={dropdownRef}>
            <div className=" inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700">
                <EllipsisVerticalIcon className='size-6' onClick={() => setIsOpen(!isOpen)} />
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                    <div className="py-1" role="none">
                        <div
                            className="flex items-center text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 cursor-default"
                            onClick={(e) => {
                                e.preventDefault();
                                onEdit();
                                setIsOpen(false);
                            }}
                        >
                            <PencilSquareIcon className='size-5 mr-2' />
                            Edit Column
                        </div>
                        <div
                            className="flex items-center text-red-700 px-4 py-2 text-sm hover:bg-gray-100 cursor-default"
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete();
                                setIsOpen(false);
                            }}
                        >
                            <TrashIcon className='size-5 mr-2' />
                            Delete Column
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
