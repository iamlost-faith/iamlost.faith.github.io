import BasicTree from "../oop/BasicTree";
import Pilea from "../oop/Pilea";
import Space from "../oop/Space";

const drawAleafEverytimeI = {
    name: "Draw a leaf everytime I think about you",

    table: {
        schema: [
            {
                columnName: "I thought about you?",
                type: "yes/no",
                customisations: [{ columnName: "I thought about you?", option: "yes", action: "color", value: "#ff0000" }]
            },
            { columnName: "Date", type: "date", customisations: [] },
            { columnName: "I thought of..", type: "longtext", customisations: [] }
        ],
        rows: [{ "I thought about you?": "yes", Date: "2024-06-26T16:24", "I thought of..": "Going to Bali with you." },]
    },
    type: new BasicTree(),
};

const happyTree = {
    name: "Happy happy?",
    table: {
        schema: [
            {
                columnName: "happy?",
                type: "yes/no",
                customisations: [{ columnName: "happy?", option: "no", action: "leaf", value: "🍂" }]
            },
            { columnName: "Date", type: "date", customisations: [] }
        ],
        rows: [{ "happy?": "yes", Date: "2024-06-26T16:24" }, { "happy?": "no", Date: "2024-06-27T16:25" }]
    },
    type: new Space(),
};

const todoCoding = {
    name: "Todo - Coding",
    table: {
        schema: [
            { columnName: "Task", type: "longtext", customisations: [] },
            {
                columnName: "Status",
                type: "options",
                customisations: [{ columnName: "Status", option: "Completed", action: "stroke-color", value: "#04901B" },
                { columnName: "Status", option: "Completed", action: "stroke-width", value: "8" }],
                options: ["Not started", "in Progress", "Completed"]
            },
            {
                columnName: "Priority",
                type: "options",
                customisations: [{ columnName: "Priority", option: "P0", action: "color", value: "#ff0000" }],
                options: ["P0", "P1", "P2"]
            },
            { columnName: "Due", type: "date", customisations: [] }
        ],
        rows: [{ Task: "Build a project in svelte to get to know it", Status: "Completed", Priority: "P0", Due: "2024-07-26T16:57" }]
    },
    type: new BasicTree(),
};

const devJournal = {
    name: "Dev Journal",
    table: {
        schema: [
            { columnName: "Content", type: "longtext", customisations: [] },
            {
                columnName: "Category",
                type: "options",
                customisations: [{ columnName: "Category", option: "Bug", action: "color", value: "#ff0000" },
                { columnName: "Category", option: "Feature", action: "color", value: "#23e143" },
                { columnName: "Category", option: "Maintenance", action: "color", value: "#dddddd" }],
                options: ["Bug", "Feature", "Maintenance"],
            },
            {
                columnName: "Author",
                type: "user",
                customisations: [],
            },
            { columnName: "Date", type: "date", customisations: [] }
        ],
        rows: [{ Content: "Journal entry of today will focus on ways in which we need to integrate API x into our application.", Category: "Maintenance", Author: "Pat Aor", Date: "2024-07-26T16:57" }]
    },
    type: new Pilea(),
};

const personalJournal = {
    name: "Journal",
    table: {
        schema: [
            { columnName: "Content", type: "longtext", customisations: [] },
            {
                columnName: "Mood",
                type: "options",
                customisations: [
                    { columnName: "Mood", option: "Happy", action: "color", value: "#23E143" },
                    { columnName: "Mood", option: "Sad", action: "color", value: "#ff0000" },
                    { columnName: "Mood", option: "Worried", action: "color", value: "#dddddd" }
                ],
                options: ["Happy", "Sad", "Worried"],
            },
            { columnName: "Date", type: "date", customisations: [] }
        ],
        rows: [{ Content: "I really liked it today :D .", Mood: "Happy", Date: "2024-07-26T16:57" }]
    },
    type: new BasicTree(),
};

const moodJournal = {
    name: "Mood Journal",
    table: {
        schema: [
            {
                columnName: "Mood",
                type: "options",
                customisations: [
                    { columnName: "Mood", option: "Happy", action: "action", value: "blink" },
                    { columnName: "Mood", option: "Sad", action: "size", value: "0.1" },
                    { columnName: "Mood", option: "Worried", action: "leaf", value: "🍂" },
                    { columnName: "Mood", option: "Excited", action: "leaf", value: "🌸" },
                    { columnName: "Mood", option: "Angry", action: "action", value: "notify-me" }],
                options: ["Happy", "Sad", "Worried", "Excited", "Angry"],
            },
            { columnName: "Date", type: "date", customisations: [] }
        ],
        rows: [
            {
                "Mood": "Excited",
                "Date": "2024-07-15T16:57"
            },
            {
                "Mood": "Angry",
                "Date": "2024-06-16T14:46"
            },
            {
                "Mood": "Worried",
                "Date": "2024-06-17T14:46"
            },
            {
                "Mood": "Sad",
                "Date": "2024-06-18T14:46"
            },
            {
                "Mood": "Happy",
                "Date": "2024-06-19T14:46"
            }
        ]
    },
    type: new Space(),
};

export { drawAleafEverytimeI, happyTree, todoCoding, devJournal, personalJournal, moodJournal };