import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Tree } from './Types';
import SchemaForm from './SchemaForm';
import DropdownMenu from './ui/DropdownMenu';
import ShowSchemaTable from './ShowSchemaTable';
import { addRow, deleteRow, deleteColumn } from '../util';
import Popup from './ui/Popup';

const Table: React.FC<{
    tree: Tree;
    setTrees: (newTrees: Tree[]) => void;
    currentTreeIndex: number;
    showTitle: boolean;
}> = ({ tree, setTrees, currentTreeIndex, showTitle = false }) => {
    const [showAddColum, setShowAddColumn] = useState<boolean>(false);
    const [showSchemaEditor, setShowShemaEditor] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    const handleInputChange = (index: number, field: string, value: string | boolean) => {
        const newRows = [...tree.table.rows];
        // be careful here. I have had a bug in the past where a radio button was not allowing 0 or 1 because I had value == true instead of ===
        if ((value === true || value === false)) {
            // we are dealing with booleans, convert them to yes/no here at the source
            const answer = value === true ? "yes" : "no";
            newRows[index] = { ...newRows[index], [field]: answer };
        } else {
            newRows[index] = { ...newRows[index], [field]: value };
        }
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees];
            const updatedTree = {
                ...updatedTrees[currentTreeIndex],
                table: {
                    ...updatedTrees[currentTreeIndex].table,
                    rows: newRows,
                },
            };
            updatedTrees[currentTreeIndex] = updatedTree;
            return updatedTrees;
        });
    };
    const handleRowClick = (index: number) => {
        setSelectedIndex(index);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
            setSelectedIndex(null);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {showTitle &&
                <div className='flex'>
                    <div className='mr-2 text-2xl text-slate-400'>Tree Name:</div>
                    <h1 className='font-bold pb-5 text-2xl'>"{tree.name}"</h1>
                </div>}
            <table className="w-full" ref={tableRef}>
                <thead>
                    <tr>
                        {tree.table.rows.length > 0 && <th scope="col" className="px-3 text-left text-xs  text-gray-500 uppercase">
                            Index
                        </th>}
                        {tree.table.schema.map((field, index) => (
                            <th key={field.columnName}
                                className="pl-3 py-2 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className='flex items-center justify-between'>
                                    <span>{field.columnName}</span>
                                    <DropdownMenu
                                        onDelete={() => deleteColumn(tree, setTrees, index, currentTreeIndex)}
                                        onEdit={() => setShowShemaEditor(true)}
                                    />
                                </div>
                            </th>
                        ))}
                        <th
                            onClick={() => setShowAddColumn(true)}
                            className="pl-3 py-2 border border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                            <div className='flex'>
                                <PlusIcon
                                    className='size-4'
                                />
                                <div className='px-2'>Add Column</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tree.table.rows.map((row, index) => (

                        <tr key={index}
                            className={selectedIndex === index ? 'bg-blue-100' : 'bg-gray-50'}
                            onClick={() => handleRowClick(index)}
                        >
                            <td scope="col" className="px-6 text-xs border text-gray-500 uppercase">
                                {index}
                            </td>
                            {tree.table.schema.map((field) => (
                                <td key={field.columnName} className="p-2 border border-gray-200  text-sm text-center">
                                    {field.type === 'text' && (
                                        <input
                                            type="text"
                                            className='border border-slate-300 px-2'
                                            value={row[field.columnName] as string}
                                            onChange={(e) => handleInputChange(index, field.columnName, e.target.value)}
                                        />
                                    )}
                                    <div className='flex'>
                                        {field.type === 'options' && field.options && (
                                            field.options.map(function (option) {
                                                return <div className="flex" key={option}>
                                                    <input
                                                        type="radio"
                                                        value={option}
                                                        name={`${field.columnName}-${index}`}
                                                        checked={row[field.columnName] === option}
                                                        onChange={(e) => handleInputChange(index, field.columnName, e.target.value)}
                                                        className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500" />
                                                    <label className="text-sm text-gray-500 mr-3 ml-1 uppercase">{option}</label>
                                                </div>
                                            })
                                        )}
                                    </div>
                                    {
                                        field.type === 'yes/no' && (
                                            <input
                                                type="checkbox"
                                                checked={row[field.columnName] === 'yes'}
                                                onChange={(e) => handleInputChange(index, field.columnName, e.target.checked)}
                                            />
                                        )
                                    }
                                    {
                                        field.type === 'date' && (
                                            <input
                                                type="datetime-local"
                                                value={row[field.columnName] as string}
                                                onChange={(e) => handleInputChange(index, field.columnName, e.target.value)}
                                            />)
                                    }
                                    {
                                        field.type === 'longtext' && (
                                            <textarea
                                                className='w-full'
                                                value={row[field.columnName] as string}
                                                onChange={(e) => handleInputChange(index, field.columnName, e.target.value)}>
                                            </textarea>)
                                    }
                                    {
                                        field.type === 'user' && (
                                            <input
                                                type="text"
                                                className='m-1 px-1 rounded-md'
                                                placeholder='enter username'
                                                value={row[field.columnName] as string}
                                                onChange={(e) => handleInputChange(index, field.columnName, e.target.value)}
                                                required
                                            />
                                        )
                                    }
                                </td>
                            ))}
                            <td className="p-2 border-b border-gray-200">
                                <TrashIcon
                                    className='size-4 text-red-500'
                                    onClick={() => deleteRow(setTrees, index, currentTreeIndex)} />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {tree.table.schema.length > 0 && <th
                            className='flex pl-3 py-2 border border-gray-200 bg-green-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider items-center'
                            onClick={() => addRow(tree, setTrees, [], currentTreeIndex)}>
                            <PlusIcon
                                className='size-4'
                            />
                            <div className='px-2'>Add Row</div>
                        </th>}
                    </tr>
                </tbody>
            </table>
            <Popup isOpen={showAddColum} onClose={() => setShowAddColumn(false)}>
                <SchemaForm setTrees={setTrees} currentTreeIndex={currentTreeIndex} onClose={() => setShowAddColumn(false)} />
            </Popup>
            <Popup isOpen={showSchemaEditor} onClose={() => setShowShemaEditor(false)}>
                < ShowSchemaTable onClose={() => setShowShemaEditor(false)} tree={tree} setTrees={setTrees} currentTreeIndex={currentTreeIndex} />
            </Popup>
        </div>
    );
};

export default Table;
