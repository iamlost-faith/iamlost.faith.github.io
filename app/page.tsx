"use client"

import { useEffect, useState } from 'react';
import Table from './components/Table';
import Plant from './components/Plant';
import { Tree } from './components/Types';
import SchemaForm from './components/SchemaForm';
import { AdjustmentsHorizontalIcon, ArrowsPointingOutIcon, BanknotesIcon, PencilIcon, PencilSquareIcon, PlusIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import ShowSchemaTable from './components/ShowSchemaTable';
import Popup from './components/ui/Popup';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import HowTo from './components/ui/HowTo';
import Templates from './components/ui/Templates';
import NewTreeForm from './components/NewTreeForm';
import Button from './components/ui/Button';
import Confirmation from './components/ui/Confirmation';
import NullTree from './oop/NullTree';
import { devJournal, drawAleafEverytimeI, happyTree, moodJournal, personalJournal, todoCoding } from './mock/trees';
import { ShareIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [showSchemaEditor, setShowShemaEditor] = useState<boolean>(false);
  const [showSchemaForm, setShowSchemaForm] = useState<boolean>(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const [showCreateNewTree, setShowCreateNewTree] = useState<boolean>(false);
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [trees, setTrees] = useState<Tree[]>([
    drawAleafEverytimeI,
    happyTree,
    todoCoding,
    devJournal,
    personalJournal,
    moodJournal

  ]);
  const [currentTree, setCurrentTree] = useState<Tree>(trees[0]);
  const [currentTreeIndex, setCurrentTreeIndex] = useState<number>(0);

  const changeTreeName = (newName: string) => {
    setTrees((prevTrees) => {
      const updatedTrees = [...prevTrees];
      updatedTrees[currentTreeIndex].name = newName;
      return updatedTrees;
    });
  };

  useEffect(() => {
    if (currentTreeIndex === -1 || trees.length === 0) {
      setCurrentTree({
        name: '',
        type: new NullTree(),
        table: { schema: [], rows: [] },
      });
    } else {
      setCurrentTree(trees[currentTreeIndex]);
    }
  }, [currentTreeIndex, trees]);


  const handleDeleteTree = () => {
    setTrees((prevTrees) => {
      // TODO: in the future filter by UUID because this will delete all with similar names
      const updatedTrees = prevTrees.filter(tree => tree.name !== currentTree.name);
      // Decrement the index if the current tree is deleted and handle edge cases
      if (updatedTrees.length === 0) {
        setCurrentTreeIndex(-1);
      } else {
        setCurrentTreeIndex(currentTreeIndex - 1);
      }
      return updatedTrees;
    });
  };

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
  const handleCloseTable = () => {
    setIsTableOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-4/5 mx-auto mt-10 ">
      <div className='relative flex flex-col space-y-4'>
        <div className=' w-32'>
          <div className='font-semibold'>Your trees</div>
          <ul>
            {trees.map((tree, index) => (
              <li
                className={`${currentTree.name === tree.name ? 'bg-lime-200 hover:bg-lime-300' : 'bg-slate-100 hover:bg-slate-200'} text-sm my-2 cursor-default shadow-sm rounded-sm p-0.5 select-none`}
                onClick={() => {
                  setCurrentTree(trees[index]);
                  setCurrentTreeIndex(index);
                }}
                key={index}>☘️ {tree.name}</li>
            ))}
            {trees.length === 0 && <div className='mt-3 text-slate-400'>Your trees will appear here.</div>}
          </ul>
        </div>
        <Button onClick={() => setShowCreateNewTree(true)} text='New tree' icon={PlusIcon} />
      </div>
      <div id="leftpane" className="flex-grow">
        <div className='flex flex-col'>
          <Plant tree={currentTree} setTrees={setTrees} setCurrentTreeIndex={setCurrentTreeIndex} currentTreeIndex={currentTreeIndex} />
        </div>
      </div>
      <div id="rightpane" className='flex flex-col space-y-4'>
        <ShareIcon className='size-4 text-slate-400 ml-2' />
        <div className="pb-3 bg-[#F6F7F9] rounded-xl border-slate-300 border shadow-md max-w-max">
          <div className='px-5 flex flex-col'>
            <h1 className='text-2xl py-5 font-bold'>A leaf 🍃 4 each entry in your data.</h1>
          </div>
        </div>

        <div
          className="flex border-dashed rounded-xl border-slate-300 border shadow-md px-2 py-4 overflow-auto max-w-md max-h-96"
        >
          <div className=''>
            {(currentTree.type instanceof NullTree) ?
              <div className='ml-2'>
                <div className='text-slate-400'>
                  Rows and columns will appear here.
                </div>
                <HowTo />
                <Templates setCurrentTreeIndex={setCurrentTreeIndex} setTrees={setTrees} long={false} currentTreeIndex={currentTreeIndex} />
              </div>
              :
              <div className='p-2 space-y-2'>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      className="rounded-md hover:border hover:border-slate-100 hover:bg-slate-50 px-2 text-xl"
                      onChange={(e) => changeTreeName(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      placeholder='Untitled tree'
                      value={currentTree.name}
                    />
                  ) : (
                    <div className=' flex items-center cursor-pointer text-xl font-bold' onClick={handleClick}>
                      <div className='text-orange-400'>
                        {currentTree.name == '' ? "Untitled tree" : currentTree.name}
                      </div>
                      <PencilIcon className='size-4 text-slate-400 ml-2' />
                    </div>
                  )}
                </div>
                <div className='flex space-x-2 justify-around'>
                  <Table tree={currentTree} setTrees={setTrees} currentTreeIndex={currentTreeIndex} showTitle={false} />
                </div>
              </div>}
          </div>
        </div>
        <div id="buttons" className='flex flex-col space-y-2 justify-center items-end rounded-sm max-w-md'>
          <Button onClick={() => setShowSchemaForm(true)} text='Column' icon={PlusCircleIcon} />
          <Button onClick={() => setIsTableOpen(true)} text='Table' icon={ArrowsPointingOutIcon} />
          <Button onClick={() => setShowShemaEditor(true)} text='Customise' icon={AdjustmentsHorizontalIcon} />
          <Confirmation
            action={'Delete'}
            content={<div><div className='text-2xl'>⚠️ </div>This will delete the <b>whole</b> table and the whole tree.<div className='text-red-500'> This cannot be undone.</div></div>}
            onConfirm={handleDeleteTree}
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}>
            <Button
              onClick={() => setShowDeleteConfirmation(true)}
              icon={TrashIcon} text="Delete" />
          </Confirmation>
          <Button onClick={() => setShowTemplates(true)} text='Templates' icon={BanknotesIcon} />
          <Button onClick={() => setIsHowToOpen(true)} icon={QuestionMarkCircleIcon} />
        </div>
      </div>


      <Popup isOpen={isTableOpen} onClose={handleCloseTable}>
        <Table tree={currentTree} setTrees={setTrees} currentTreeIndex={currentTreeIndex} showTitle={true} />
      </Popup>

      <Popup isOpen={showSchemaForm} onClose={() => setShowSchemaForm(false)}>
        <SchemaForm
          onClose={() => setShowSchemaForm(false)}
          currentTreeIndex={currentTreeIndex}
          setTrees={setTrees}
        />
      </Popup>

      <Popup isOpen={showSchemaEditor} onClose={() => setShowShemaEditor(false)}>
        < ShowSchemaTable setTrees={setTrees} onClose={() => setShowShemaEditor(false)} tree={currentTree} setCurrentTreeIndex={setCurrentTreeIndex} currentTreeIndex={currentTreeIndex} />
      </Popup>
      <Popup isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)} >
        <HowTo />
      </Popup>
      <Popup isOpen={showTemplates} onClose={() => setShowTemplates(false)} >
        <Templates setCurrentTreeIndex={setCurrentTreeIndex} currentTreeIndex={currentTreeIndex} setTrees={setTrees} long={true} onClose={() => setShowTemplates(false)} />
      </Popup>
      <Popup isOpen={showCreateNewTree} onClose={() => setShowCreateNewTree(false)} >
        <NewTreeForm setTrees={setTrees} setCurrentTreeIndex={setCurrentTreeIndex} onClose={() => setShowCreateNewTree(false)} />
      </Popup>
    </div>
  );
}