// components/SchemaForm.tsx
import React from 'react';
import { SupportedTreesTypes, Tree } from './Types';

interface SchemaFormProps {
    setCurrentTreeIndex: (newIndex: number) => void,
    setTrees: (newTrees: Tree[]) => void;
    onClose: () => void;
}

const NewTreeForm: React.FC<SchemaFormProps> = ({ setCurrentTreeIndex, setTrees, onClose }) => {
    const newTree = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const formValues = {
            name: formData.get('name')?.toString() || '',
            typeName: formData.get('typeName')?.toString() || '',
        };
        const data: Tree = {
            name: formValues.name,
            type: SupportedTreesTypes[formValues.typeName as keyof typeof SupportedTreesTypes],
            table: { schema: [], rows: [] }
        };
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees, data];
            setCurrentTreeIndex(prevTrees.length); // the newly created tree becomes the currentTree
            return updatedTrees;
        });
        onClose();
    };

    return (
        <form onSubmit={newTree} className="space-y-4 font-semibold text-slate-400 ">
            <div>
                <div className=''>Tree Name</div>
                <input
                    type="text"
                    name="name"
                    className="border-slate-300 px-2 border rounded-md text-black"
                    required
                />
            </div>
            <div className=''>
                <label className='font-semibold'>Tree Type</label>
                <select
                    className="ml-2 rounded items-center text-black"
                    name="typeName"
                    required
                >
                    {Object.keys(SupportedTreesTypes).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex space-x-2'>
                <button
                    className="rounded-full text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="flex-grow bg-blue-500 text-white p-2 rounded-full hover:bg-lime-500"
                    type="submit"
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default NewTreeForm;
