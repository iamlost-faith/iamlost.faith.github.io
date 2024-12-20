import React, { useEffect, useMemo, useRef, useState } from "react";
import { CustomisationField, Schema, TableRow, Tree } from "./Types";
import AddLeafForm from "./AddLeafForm";
import Popup from "./ui/Popup";
import Button from "./ui/Button";
import SchemaForm from "./SchemaForm";
import Space from "../oop/Space";
import BasicTree from "../oop/BasicTree";
import { BushyPlantGenus, PileaGenus, ZamiaGenus, SvgPlant, DragonTreeGenus } from "../lib/main";
import SvgRenderer from "./ui/plants/SvgRenderer";
import Pilea from "../oop/Pilea";
import { hideTooltip, showTooltip } from "../util";


const combinedCustomisations = (schema: Schema) => {
    var combined: CustomisationField[] = [];
    for (let i = 0; i < schema.length; i++) {
        const customisations = schema[i].customisations;
        if (customisations) {
            combined = combined.concat(customisations);
        }
    }
    return combined;
}

const Plant: React.FC<{
    tree: Tree,
    setTrees: (newTrees: Tree[]) => void
    setCurrentTreeIndex: (newIndex: number) => void
    currentTreeIndex: number;
}> = ({ tree, setTrees, setCurrentTreeIndex, currentTreeIndex }) => {
    const [showGetStarted, setShowGetStarted] = useState<boolean>(false);
    const [showAddLeafForm, setShowAddLeafForm] = useState<boolean>(false);
    const [showSchemaForm, setShowSchemaForm] = useState<boolean>(false);
    const allCustomisations = useMemo(() => combinedCustomisations(tree.table.schema), [tree.table.schema]);
    const tooltip = useRef<HTMLDivElement>(null);
    const [plant, setPlant] = useState<string>('bushy');

    const getPlant = (plant: string) => {
        switch (plant) {
            case 'bushy': return new BushyPlantGenus();
            case 'pilea': return new PileaGenus();
            case 'zamia': return new ZamiaGenus();
        }
        return new DragonTreeGenus();
    }

    const pilea = new SvgPlant(getPlant(plant), {
        color: true,
        age: 1,
        potSize: 0.33,
        potPathAttr: {
            fill: '#fc7',
            stroke: '#da5'
        }
    });
    useEffect(() => {
        pilea.animate(0, 1, 3000);
    }, []);

    const getProperty = (row: TableRow, property: string): string => {
        const result = allCustomisations.filter(setting => setting.action === property);

        function processor(): string | undefined {
            const boolArray = [];
            for (let i = 0; i < result.length; i++) {
                boolArray.push([row[result[i].columnName] === result[i].option, result[i].value])
            }
            const exists = boolArray.find(arr => arr[0]);
            if (exists !== undefined) {
                return exists[1];
            }
            return undefined;
        }
        const value = processor();
        return tree.type.askProperty(value, property);
    }

    useEffect(() => {
        if (tree.table.rows.length === 0) {
            setShowGetStarted(false);
        }
    }, [tree.table.rows.length])

    return (
        <div className='relative flex flex-col space-y-10 justify-center items-center h-screen'>
            {(tree.type instanceof Pilea) &&
                <>
                    <select
                        className='relative border rounded-md'
                        onChange={(e) => setPlant(e.target.value)}
                    >
                        <option value="bushy">bushy</option>
                        <option value="pilea">pilea</option>
                        <option value="zamia">zamia</option>
                        <option value="dragon">dragon</option>
                    </select>
                    <SvgRenderer svgElement={pilea.svgElement} />
                </>

            }

            {(tree.type instanceof Space) &&
                <>
                    <div className="hidden absolute bg-yellow-300 p-2 rounded-sm w-48" ref={tooltip}></div>
                    <svg width="500" height="800" viewBox="0 0 200 150" className=''>
                        {tree.table.rows.map(function (row, index) {
                            return (
                                <g
                                    key={index}
                                    onMouseMove={(e) => showTooltip(e, row, tooltip)}
                                    onMouseOut={() => hideTooltip(tooltip)}
                                >
                                    <text transform={`scale(${getProperty(row, 'size')})`} x={Math.floor(Math.random() * 100)} y={Math.floor(Math.random() * 100)}>{getProperty(row, 'leaf')}</text>
                                </g>
                            );
                        })}
                    </svg>
                </>
            }

            {(tree.type instanceof BasicTree) &&
                <div className="flex justify-center items-centre">
                    <div className="hidden absolute bg-yellow-300 p-2 rounded-sm w-48" ref={tooltip}></div>
                    <svg width="200" height="400" viewBox="0 0 200 50" className=''>
                        <line x1="100" y1="80" x2="100" y2="-90" stroke="green" strokeWidth="4" />
                        <rect x="50" y="50" width="100" height="50" fill="brown" />
                        <rect x="40" rx="5" y="40" width="120" height="10" fill="brown" />
                        {tree.table.rows.map(function (row, index) {
                            return (
                                <g
                                    key={index}
                                    transform={`translate(${index % 2 === 0 ? 55 : 95}, ${-20 - index * 10}) scale(${getProperty(row, 'size')})`}
                                    onMouseMove={(e) => showTooltip(e, row, tooltip)}
                                    onMouseOut={() => hideTooltip(tooltip)}
                                >
                                    <path
                                        d={`${index % 2 === 0 ?
                                            "M90 50 C90 70, 70 90, 50 90 S10 70, 10 50, 30 10, 50 10, 65 30, 90 50 Z"
                                            : "M10 50 C10 30, 30 10, 50 10 S90 30, 90 50, 70 90, 50 90, 35 70, 10 50 Z"}`}
                                        fill={getProperty(row, 'color')}
                                        stroke={getProperty(row, 'stroke-color')}
                                        strokeWidth={getProperty(row, 'stroke-width')}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>}
            <div
                className="relative bottom-0 text-center bg-lime-500 p-4 rounded-md text-white font-semibold cursor-default hover:bg-lime-600 max-w-max"
                onClick={tree.table.schema.length === 0 ? () => setShowGetStarted(true) : () => setShowAddLeafForm(true)}
            >
                Add leaf🍃
            </div>
            <Popup isOpen={showGetStarted && tree.table.schema.length === 0} onClose={() => setShowGetStarted(false)}>
                <div>You currently do not have columns.</div>
                <Button onClick={() => setShowSchemaForm(true)} text="Create Column" color='bg-sky-300' />
            </Popup>
            <Popup isOpen={showSchemaForm} onClose={() => setShowSchemaForm(false)}>
                <SchemaForm setTrees={setTrees} currentTreeIndex={currentTreeIndex} onClose={() => setShowSchemaForm(false)} />
            </Popup>
            {showAddLeafForm &&
                <AddLeafForm tree={tree} currentTreeIndex={currentTreeIndex} onClose={() => setShowAddLeafForm(false)} setTrees={setTrees} />}
        </div >
    );
};

export default Plant;