import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Info: React.FC<{ data: string }> = ({ data }) => {
    return (
        <div className="flex items-center my-4 bg-blue-100 p-2 rounded-md text-sm text-slate-600">
            <InformationCircleIcon className="size-8 text-blue-500" />
            <div className="ml-4">{data}</div>
        </div>
    );
};

export default Info;