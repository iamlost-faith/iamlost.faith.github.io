import React, { useState } from 'react';
import { SchemaField, SupportedTypes, Tree } from './Types';
import NullTree from '../oop/NullTree';
import BasicTree from '../oop/BasicTree';

interface SchemaFormProps {
    currentTreeIndex: number;
    setTrees: (newTrees: Tree[]) => void;
    onClose: () => void;
}
const SchemaForm: React.FC<SchemaFormProps> = ({ currentTreeIndex, setTrees, onClose }) => {
    const [columnName, setColumnName] = useState('');
    const [type, setType] = useState<string>('text');
    const [optionsArray, setOptionsArray] = useState<string[]>([]);

    const addField = (e: React.FormEvent) => {
        e.preventDefault();
        const newField: SchemaField = { columnName, type, customisations: [] };
        if (type === 'options') {
            newField.options = optionsArray;
        }
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees];
            const currentTreeType = updatedTrees[currentTreeIndex].type;
            const updatedTree = {
                ...updatedTrees[currentTreeIndex],
                table: {
                    ...updatedTrees[currentTreeIndex].table,
                    schema: [...updatedTrees[currentTreeIndex].table.schema, newField],
                },
                type: currentTreeType instanceof NullTree ? new BasicTree() : currentTreeType,
            };
            updatedTrees[currentTreeIndex] = updatedTree;
            return updatedTrees;
        });

        setColumnName('');
        setType('text');
        setOptionsArray([]);
        onClose();
    };
    const handleOptions = (optionsString: string) => {
        setOptionsArray(optionsString.split(',').map(option => option.trim()).filter(value => value != ''));
    }

    return (

        <form onSubmit={addField} className="space-y-4 font-semibold text-slate-400">
            <h2 className='font-bold uppercase'>Create a Column</h2>
            <div>
                <label>
                    <div className=''>Column Name</div>
                    <input
                        type="text"
                        value={columnName}
                        className={`${columnName == '' ? 'border-slate-300' : ''} w-20px-2 border rounded-md text-black `}
                        onChange={(e) => setColumnName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className=''>
                <label className='font-semibold'>
                    Type
                    <select
                        className="ml-2 rounded items-center text-black"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {SupportedTypes.map((aType) => (<option key={aType} value={aType}>{aType}</option>))}
                    </select>
                </label>
            </div>
            {type === 'options' && (
                <div>
                    <div className=''>Options (comma separated)</div>
                    <div className="">
                        <input
                            className={`${columnName == '' ? 'border-slate-300' : ''} px-2 border rounded-md`}
                            onChange={(e) => handleOptions(e.target.value)}
                            required
                        />
                        <div className=''>
                            {optionsArray.map((value, index) => (
                                <div key={index} className="inline-block bg-gray-200 rounded-full text-sm px-1 py-1 mr-1">
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className='flex space-x-2'>
                <button className="rounded-full text-gray-400 hover:text-gray-600" type="button" onClick={() => onClose()}>
                    Cancel
                </button>
                <button className="flex-grow bg-blue-500 text-white p-2 rounded-full hover:bg-lime-500" type="submit">
                    Add Column
                </button>
            </div>
        </form>
    )
}


export default SchemaForm;