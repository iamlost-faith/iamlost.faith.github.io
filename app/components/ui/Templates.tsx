import { useState } from "react";
import SchemaForm from "../SchemaForm";
import { Tree } from "../Types";
import Popup from "./Popup";
import Collapsible from "./Collapsible";

import { drawAleafEverytimeI, happyTree, todoCoding, devJournal, personalJournal, moodJournal } from '../../mock/trees'

const Templates: React.FC<{
    setCurrentTreeIndex: (newIndex: number) => void,
    currentTreeIndex: number;
    setTrees: (newTrees: Tree[]) => void,
    long: boolean
    onClose?: () => void;
}> = ({ setCurrentTreeIndex, currentTreeIndex, setTrees, long = false, onClose }) => {
    const [showSchemaForm, setShowSchemaForm] = useState<boolean>(false);
    const handleTemplate = (template: Tree) => {
        setTrees((prevTrees) => {
            const updatedTrees = [...prevTrees, template];
            setCurrentTreeIndex(prevTrees.length); // the newly created tree becomes the currentTree
            return updatedTrees;
        });
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl mb-2'>Get started with template:</h2>
            <div className='flex flex-col md:flex-row space-y-2 md:space-x-2 items-baseline'>
                <div
                    className="text-center bg-yellow-300 p-4 rounded-md max-w-max text-black font-semibold cursor-default hover:bg-yellow-500"
                    onClick={() => handleTemplate(happyTree)}
                >
                    Daily Happiness Tracker 😀
                </div>
                <div
                    className="text-center bg-rose-300 p-4 rounded-md max-w-max text-black font-semibold cursor-default hover:bg-rose-500"
                    onClick={() => handleTemplate(todoCoding)}
                >
                    Todo
                </div>
                <div
                    onClick={() => setShowSchemaForm(true)}
                    className="text-center shadow-md p-4 rounded-md max-w-max text-black font-semibold cursor-default hover:bg-slate-200">
                    Blank
                </div>
            </div>
            <div
                onClick={() => handleTemplate(drawAleafEverytimeI)}
                className="mt-2 bg-lime-200 text-center shadow-md p-4 rounded-md max-w-max text-lime-600 font-semibold cursor-default hover:bg-lime-300">
                Draw a leaf everytime I think about you
            </div>
            {long && <div className="mt-3">
                <Collapsible outterText={"More templates"} open={true}>
                    <div className="flex flex-col md:flex-row md:space-x-2">
                        <div
                            onClick={() => handleTemplate(devJournal)}
                            className="mt-2 text-center shadow-md p-4 rounded-md max-w-max text-slate-600 border font-semibold cursor-default hover:bg-slate-50">
                            Dev Journal
                        </div>
                        <div
                            onClick={() => handleTemplate(personalJournal)}
                            className="mt-2 text-center shadow-md p-4 rounded-md max-w-max text-slate-600 border font-semibold cursor-default hover:bg-slate-50">
                            Personal Journal
                        </div>
                        <div
                            onClick={() => handleTemplate(moodJournal)}
                            className="mt-2 text-center shadow-md p-4 rounded-md max-w-max text-slate-600 border font-semibold cursor-default hover:bg-slate-50">
                            Mood Journal
                        </div>
                    </div>
                </Collapsible>
            </div>}

            {/*TODO: add the dev journal template and place it into a collapsible */}
            <Popup isOpen={showSchemaForm} onClose={() => setShowSchemaForm(false)}>
                <SchemaForm setTrees={setTrees} currentTreeIndex={currentTreeIndex} onClose={() => setShowSchemaForm(false)} />
            </Popup>
        </div>
    );
};

export default Templates;