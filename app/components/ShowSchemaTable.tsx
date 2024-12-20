import { PencilIcon } from '@heroicons/react/24/solid';
import Info from './ui/Info';
import { AskSettings } from './AskSettings';
import { SchemaField, SupportedTypes, Tree } from './Types';
import { useState } from 'react';
import Templates from './ui/Templates';

interface SchemaTableProps {
    onClose: () => void;
    tree: Tree;
    setTrees: (newTrees: Tree[]) => void;
    currentTreeIndex: number;
    setCurrentTreeIndex: (newIndex: number) => void;
}

const ShowSchemaTable: React.FC<SchemaTableProps> = ({ onClose, tree, setTrees, currentTreeIndex, setCurrentTreeIndex }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
        }
    };

    const changeTableColumnName = (index, newName) => {
        let oldSchemaName = '';
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees];
            const updatedTree = {
                ...updatedTrees[currentTreeIndex],
                table: {
                    ...updatedTrees[currentTreeIndex].table,
                    schema: updatedTrees[currentTreeIndex].table.schema.map((schemaField, schemaIndex) => {
                        if (schemaIndex === index) {
                            oldSchemaName = schemaField.columnName;
                            return {
                                ...schemaField,
                                columnName: newName,
                                customisations: schemaField.customisations.map(customisation => { // change in existing customisations
                                    if (customisation.columnName === oldSchemaName) {
                                        return { ...customisation, columnName: newName };
                                    }
                                    return customisation;
                                }),
                            };
                        }
                        return schemaField;
                    }),
                    rows: updatedTrees[currentTreeIndex].table.rows.map(record => { // change in existing rows
                        const { [oldSchemaName]: oldValue, ...rest } = record;
                        return { ...rest, [newName]: oldValue };
                    }),
                },
            };
            updatedTrees[currentTreeIndex] = updatedTree;
            return updatedTrees;
        });
    }

    const changeSchemaType = (columnIndex: number, type: string) => {
        let schemaField: SchemaField = {
            columnName: tree.table.schema[columnIndex].columnName,
            type: type,
            customisations: []
        };
        if (type === "options") {
            schemaField.options = [];
        }
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees];
            const updatedTree = {
                ...updatedTrees[currentTreeIndex],
                table: {
                    ...updatedTrees[currentTreeIndex].table,
                    schema: updatedTrees[currentTreeIndex].table.schema.map((field, i) =>
                        i === columnIndex ? schemaField : field
                    ),
                },
            };
            updatedTrees[currentTreeIndex] = updatedTree;
            return updatedTrees;
        });

    };

    return (
        <div className="">
            <div className='flex flex-col md:flex-row items-baseline'>
                <div className='mr-2 text-2xl'>Tree name: </div>
                <h2 className="text-2xl font-bold mb-4 mr-2" > {tree.name}</h2 >
            </div >
            {
                tree.table.schema.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    {Object.keys(tree.table.schema[0]).map((key, index) => (
                                        <th key={index} className="px-4 py-2 font-bold uppercase">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody >
                                {tree.table.schema.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, valueIndex) => (
                                            <td key={valueIndex} className="border p-2 border-slate-400 max-w-max">
                                                {valueIndex === 0 &&
                                                    <div
                                                        className="p-2 text-l font-semibold rounded border border-gray-300 shadow">
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                className="px-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                                value={value}
                                                                onChange={(e) => changeTableColumnName(index, e.target.value)}
                                                                onBlur={handleBlur}
                                                                onKeyDown={handleKeyDown}
                                                            />
                                                        ) : (
                                                            <div className='flex items-center cursor-pointer' onClick={handleClick}>
                                                                <div className='flex-grow'>
                                                                    {value}
                                                                </div>
                                                                <PencilIcon className='size-4 text-slate-400 ml-5' />
                                                            </div>

                                                        )}
                                                    </div>}

                                                {valueIndex === 1 &&
                                                    <div
                                                        className="flex p-2 text-l font-semibold rounded border border-gray-300 shadow cursor-pointer">
                                                        <select
                                                            value={tree.table.schema[index].type}
                                                            onChange={(e) => changeSchemaType(index, e.target.value)}
                                                            className="bg-gray-100 rounded-md  w-full">
                                                            {SupportedTypes.map((aType) => (<option key={aType} value={aType}>{aType}</option>))}
                                                        </select>
                                                    </div>

                                                }
                                                {valueIndex === 2 && (
                                                    <div className=''>
                                                        <>
                                                            {
                                                                tree.table.schema[index].type === 'yes/no' &&
                                                                <AskSettings
                                                                    columnIndex={index}
                                                                    optionsArray={['yes', 'no']}
                                                                    tree={tree}
                                                                    setTrees={setTrees}
                                                                    currentTreeIndex={currentTreeIndex} />
                                                            }
                                                            {
                                                                tree.table.schema[index].type === 'options' &&
                                                                <AskSettings
                                                                    columnIndex={index}
                                                                    optionsArray={tree.table.schema[index].options}
                                                                    tree={tree}
                                                                    setTrees={setTrees}
                                                                    currentTreeIndex={currentTreeIndex}
                                                                />
                                                            }
                                                            {tree.table.schema[index].type === 'date' &&
                                                                <AskSettings
                                                                    columnIndex={index}
                                                                    optionsArray={['due', 'overdue', 'in 1 day', 'in 3 days', 'in 7 days', 'in 30 days', 'birthday', 'birthday in 7 days']}
                                                                    tree={tree}
                                                                    setTrees={setTrees}
                                                                    currentTreeIndex={currentTreeIndex} />
                                                            }
                                                            {tree.table.schema[index].type === 'user' &&
                                                                <AskSettings
                                                                    columnIndex={index}
                                                                    optionsArray={[]}
                                                                    tree={tree}
                                                                    setTrees={setTrees}
                                                                    currentTreeIndex={currentTreeIndex} />
                                                            }
                                                        </>
                                                    </div>
                                                )}
                                                {valueIndex === 3 &&
                                                    tree.table.schema[index].options.map((value, index) => (
                                                        <div key={index} className="inline-block bg-gray-200 rounded-full text-sm px-2 py-1 mr-1">
                                                            {value}
                                                        </div>
                                                    ))
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        {/*todo: add a button here to go to create columns*/}
                        <Info data={`${tree.name} currently has no columns.`} />
                        <Templates setTrees={setTrees} setCurrentTreeIndex={setCurrentTreeIndex} currentTreeIndex={currentTreeIndex} long={false} />
                    </div>
            }
            < div className="flex justify-end" >
                <button
                    className="rounded-md hover:bg-lime-600 focus:outline-none bg-lime-500 px-3 py-2 text-white mt-5"
                    onClick={onClose}
                >
                    Close
                </button>
            </div >
        </div >
    );
};

export default ShowSchemaTable;
