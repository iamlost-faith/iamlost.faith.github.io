import { TableRow, Tree } from "./components/Types";

const addRow = (tree, setTrees, data, currentTreeIndex) => {
    // Create a new row object
    const newRow: TableRow = {};
    for (const field of tree.table.schema) {
        newRow[field.columnName] = field.type === 'yes/no' ? 'no' : '';
    }

    // now override the fields
    Object.entries(data).forEach(([key, value]) => {
        newRow[key] = value;
    });

    setTrees((prevTrees) => {
        const updatedTrees = [...prevTrees];
        const updatedTree = {
            ...updatedTrees[currentTreeIndex],
            table: {
                ...updatedTrees[currentTreeIndex].table,
                rows: [...updatedTrees[currentTreeIndex].table.rows, newRow],
            },
        };
        updatedTrees[currentTreeIndex] = updatedTree;
        return updatedTrees;
    });
};

const deleteRow = (setTrees, rowIndex: number, currentTreeIndex: number) => {
    setTrees((prevTrees) => {
        const updatedTrees = [...prevTrees];
        const newRows = { ...updatedTrees[currentTreeIndex] }.table.rows.filter((_: any, i: number) => i !== rowIndex);
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

const deleteColumn = (tree: Tree, setTrees, index: number, currentTreeIndex) => {

    setTrees((prevTrees) => {
        const updatedTrees = [...prevTrees];
        const updatedTree = {
            ...updatedTrees[currentTreeIndex],
            table: {
                ...updatedTrees[currentTreeIndex].table,
                schema: tree.table.schema.filter((item, i) => i !== index),
            },
        };
        // todo: add empty schema the same way you are adding an emty row
        // tree.table.rows.forEach((x) => x != {}});
        updatedTree.table.rows.forEach((x: TableRow) => delete x[tree.table.schema[index].columnName]);
        updatedTrees[currentTreeIndex] = updatedTree;
        return updatedTrees;
    });

}


const getFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData, e.target);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
        const inputElement = (e.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement);
        if (inputElement.type === 'checkbox') {
            data[key] = (inputElement as HTMLInputElement).checked ? "yes" : "no";
        } else {
            data[key] = value;
        }
    });
    return data;
};

function showTooltip(evt: MouseEvent, row: TableRow, tooltip: React.RefObject<unknown>) {
    // Function to detect if a string is a date in the format "DD/MM/YYYY, HH:MM"
    function isDateString(value: string): boolean {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return isoDateRegex.test(value);
    }

    const text = Object.entries(row).map(([k, v]) => {
        if (typeof v === 'string' && isDateString(v)) {
            return `<b>${k}</b>: ${v} <b>(${TimeAgo.toDuration(v)})</b>`;
        }
        return `<b>${k}</b>: ${v}`;
    }).join('<br/>');
    if (tooltip.current === null) return;
    tooltip.current.innerHTML = text + `</br>Delete`;
    tooltip.current.style.display = "block";
    tooltip.current.style.left = evt.pageX - 340 + 'px';
    tooltip.current.style.top = evt.pageY - 50 + 'px';
}

function hideTooltip(tooltip: React.RefObject<unknown>) {
    if (tooltip.current === null) return;
    tooltip.current.style.display = "none";
}


class TimeAgo {
    private static readonly times: number[] = [
        365 * 24 * 60 * 60 * 1000, // year
        30 * 24 * 60 * 60 * 1000,  // month
        24 * 60 * 60 * 1000,       // day
        60 * 60 * 1000,            // hour
        60 * 1000,                 // minute
        1000                       // second
    ];

    private static readonly timesString: string[] = ["year", "month", "day", "hour", "minute", "second"];

    public static toDuration(dateString: string): string {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        const duration = date.getTime() - new Date().getTime();
        const absDuration = Math.abs(duration);
        let res: string = "";

        for (let i = 0; i < TimeAgo.times.length; i++) {
            const current = TimeAgo.times[i];
            const temp = Math.floor(absDuration / current);
            if (temp > 0) {
                res = `${temp} ${TimeAgo.timesString[i]}${temp !== 1 ? "s" : ""}`;
                res += duration < 0 ? " ago" : "";
                break;
            }
        }

        if (res === "") {
            res = "0 seconds ago";
        } else if (duration > 0) {
            res = `in ${res}`;
        }
        return res;
    }
}

export { addRow, deleteRow, deleteColumn, getFormData, showTooltip, hideTooltip };