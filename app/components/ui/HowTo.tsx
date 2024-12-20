import Collapsible from "./Collapsible";

const HowTo: React.FC = () => {
    return (
        <div className=''>
            <div className='flex flex-col space-y-2'>
                <h1 className='uppercase text-2xl mt-2'>How it works:</h1>
                <ol className='list-decimal list-inside font-semibold'>
                    <li>🤲 You create a column(s).</li>
                    <li>🍃 We draw a leaf for every row.</li>
                    <li>🌸 You customise how the tree looks.</li>
                </ol>
                That's pretty much it!
                <Collapsible outterText={'Reveal other features'}>
                    <ul className='list-inside list-disc text-slate-400'>
                        <li>You can also export rows and columns.</li>
                        <li>Import rows and colums.</li>
                        <li>Sync tree with data from elsewhere.</li>
                        <li>Embed tree in your website.</li>
                        <li>Share tree as SVG.</li>
                    </ul>
                </Collapsible>
            </div>
        </div>
    );
};

export default HowTo;