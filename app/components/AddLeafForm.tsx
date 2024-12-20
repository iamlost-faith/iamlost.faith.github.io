import React from 'react';
import { Tree } from './Types';
import { addRow, getFormData } from '../util';

const Table: React.FC<{
    tree: Tree;
    currentTreeIndex: number;
    setTrees: (newTrees: Tree[]) => void;
    onClose: () => void;
}> = ({ tree, currentTreeIndex, setTrees, onClose }) => {

    const addLeaf = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            const inputElement = (e.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement);
            if (inputElement.type === 'checkbox') {
                data[key] = (inputElement as HTMLInputElement).checked ? "yes" : "no";
            } else {
                data[key] = value;
            }
        });
        addRow(tree, setTrees, data, currentTreeIndex);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <form onSubmit={addLeaf} className="flex flex-col bg-white p-6 rounded-md shadow-lg max-w-md w-full space-y-3 font-semibold text-slate-400 ">
                {tree.table.schema.map((field) => (
                    <div key={field.columnName}>
                        {field.type === 'text' && (
                            <div>
                                <div>{field.columnName}</div>
                                <input
                                    type="text"
                                    className='border border-slate-300 px-2 text-slate-950'
                                    name={field.columnName}
                                />
                            </div>

                        )}
                        {field.type === 'options' && field.options && (
                            <div>
                                <div>{field.columnName}</div>
                                <div className='flex flex-col text-slate-950 md:flex-row'>
                                    {field.options.map(function (option, index) {
                                        return <div className="flex" key={option}>
                                            <input
                                                type="radio"
                                                value={option}
                                                name={field.columnName}
                                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500" />
                                            <label className="text-sm text-gray-500 mr-3 ml-1 uppercase">{option}</label>
                                        </div>
                                    })}

                                </div>
                            </div>)}
                        {field.type === 'yes/no' && (
                            <div>
                                <div>{field.columnName}</div>
                                <input
                                    type="checkbox"
                                    name={field.columnName}
                                />
                            </div>

                        )}
                        {field.type === 'date' && (
                            <div>
                                <div>{field.columnName}</div>
                                <input
                                    type="datetime-local"
                                    name={field.columnName}
                                />
                            </div>
                        )}
                        {field.type === 'longtext' && (
                            <div>
                                <div>{field.columnName}</div>
                                <textarea
                                    className='w-full border border-slate-200 rounded-md px-2 text-slate-800'
                                    name={field.columnName}>
                                </textarea>
                            </div>
                        )}
                        {field.type === 'user' && (
                            <div>
                                <div>{field.columnName}</div>
                                <input
                                    type="text"
                                    className='m-1 px-1 rounded-md'
                                    placeholder='enter username'
                                    name={field.columnName}
                                    required
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className='flex space-x-2'>
                    <button className="flex-grow bg-blue-500 text-white p-2 rounded-full hover:bg-green-500" type="submit">
                        Add Leaf
                    </button>
                    <button className="bg-gray-400 text-white p-2 rounded-full hover:bg-gray-500" type="button"
                        onClick={() => onClose()}>
                        Cancel
                    </button>
                </div>
            </form >
        </div>
    );
};

export default Table;
