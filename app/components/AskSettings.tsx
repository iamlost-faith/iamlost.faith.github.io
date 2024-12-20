import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { CustomisationField, Tree } from './Types';

const AskSettings: React.FC<{
    columnIndex: number;
    optionsArray: string[];
    tree: Tree;
    setTrees: (newTrees: Tree[]) => void;
    currentTreeIndex: number;
}> = ({ columnIndex, optionsArray, tree, setTrees, currentTreeIndex }) => {

    const handleChangeCustomisations = (
        index: number,
        field: 'option' | 'action' | 'value',
        value: string
    ) => {
        setTrees((prevTrees) => {
            return prevTrees.map((tree, treeIndex) => {
                if (treeIndex === currentTreeIndex) {
                    const updatedSchema = [...tree.table.schema];
                    const updatedCustomisations = [...updatedSchema[columnIndex].customisations];
                    updatedCustomisations[index][field] = value;

                    if (field === 'action') {
                        updatedCustomisations[index].value = tree.type.defaultValues[value];
                    }

                    updatedSchema[columnIndex] = {
                        ...updatedSchema[columnIndex],
                        customisations: updatedCustomisations,
                    };

                    return {
                        ...tree,
                        table: {
                            ...tree.table,
                            schema: updatedSchema,
                        },
                    };
                }
                return tree;
            });
        });
    };

    const ensureOneActionPerOption = () => {

    };

    const ensureNoOverlappingAction = () => {

    };

    const handleOptions = (optionsString: string) => {
        setTrees((prevTrees) => {
            return prevTrees.map((tree, index) => {
                console.log('we are here', index, currentTreeIndex);
                if (index === currentTreeIndex) {
                    return {
                        ...tree,
                        table: {
                            ...tree.table,
                            schema: tree.table.schema.map((field, i) =>
                                i === columnIndex
                                    ? { ...field, options: optionsString.split(',').map(option => option.trim()) }
                                    : field
                            ),
                        },
                    };
                }
                return tree;
            });
        });

    };

    return (
        <>
            <div>
                {tree.table.schema[columnIndex].type === 'options' && (
                    <div className=''>
                        <div className='text-slate-400'>Options (comma separated): </div>
                        <textarea
                            className={'px-2 border rounded-md my-2'}
                            onChange={(e) => handleOptions(e.target.value)}
                            value={tree.table.schema[columnIndex].options !== undefined ? tree.table.schema[columnIndex].options.join(',') : ''}
                        ></textarea>
                    </div>
                )}
                {tree.table.schema[columnIndex].customisations.map((setting: CustomisationField, index: number) => (
                    <div key={index} className='flex md:items-center flex-col md:flex-row'>
                        <span className='mr-1 text-slate-500'>When</span>
                        {tree.table.schema[columnIndex].type === 'user' && (
                            <input
                                type="text"
                                className='m-1 px-1 rounded-md border'
                                placeholder='username equals'
                                onChange={(e) => handleChangeCustomisations(index, 'action', e.target.value)}
                                required
                            />
                        )}

                        {tree.table.schema[columnIndex].type !== 'user' &&
                            <select
                                className='border rounded-md'
                                value={setting.option}
                                onChange={(e) => handleChangeCustomisations(index, 'option', e.target.value)}
                            >
                                {optionsArray.map((field) => (
                                    <option key={field} value={field}>
                                        {field.toString()}
                                    </option>
                                ))}
                            </select>}
                        {tree.type.askSettings(handleChangeCustomisations, index, setting, tree.table.schema[columnIndex].type)}
                        <XMarkIcon className='size-5 text-red-600 cursor-pointer'
                            onClick={() =>
                                setTrees((prevTrees) => {
                                    return prevTrees.map((tree, treeIndex) => {
                                        if (treeIndex === currentTreeIndex) {
                                            const updatedSchema = [...tree.table.schema];
                                            const updatedCustomisations = [
                                                ...updatedSchema[columnIndex].customisations.slice(0, index),
                                                ...updatedSchema[columnIndex].customisations.slice(index + 1),
                                            ];
                                            updatedSchema[columnIndex] = {
                                                ...updatedSchema[columnIndex],
                                                customisations: updatedCustomisations,
                                            };

                                            return {
                                                ...tree,
                                                table: {
                                                    ...tree.table,
                                                    schema: updatedSchema,
                                                },
                                            };
                                        }
                                        return tree;
                                    });
                                })
                            } />
                    </div>
                ))}
                <div className='flex items-center uppercase text-sm border bg-green-200 border-dashed rounded-lg cursor-pointer my-3 float-left p-1'
                    onClick={() =>
                        setTrees((prevTrees) => {
                            return prevTrees.map((tree, index) => {
                                if (index === currentTreeIndex) {
                                    const newSchema = tree.table.schema.map((field, i) => {
                                        if (i === columnIndex) {
                                            return {
                                                ...field,
                                                customisations: [
                                                    ...field.customisations,
                                                    {
                                                        columnName: tree.table.schema[columnIndex].columnName,
                                                        option: optionsArray[0],
                                                        action: tree.type.defaultAction,
                                                        value: tree.type.defaultValues[tree.type.defaultAction],
                                                    },
                                                ],
                                            };
                                        }
                                        return field;
                                    });

                                    return {
                                        ...tree,
                                        table: {
                                            ...tree.table,
                                            schema: newSchema,
                                        },
                                    };
                                }
                                return tree;
                            });
                        })
                    }>
                    <PlusIcon
                        className='size-4 text-slate-800 border rounded-full border-black mr-1'
                    />
                    <div>Add customisation 🌸</div>
                </div>
            </div >
        </>
    );
};

export { AskSettings };
