import BasicTree from "../oop/BasicTree";
import Pilea from "../oop/Pilea";
import Space from "../oop/Space";
import TreeType from "../oop/TreeType";

export interface CustomisationField {
    columnName: string;
    option: string;
    action: string;
    value: string;
}

export interface SchemaField {
    columnName: string;
    type: string;
    options?: string[]; // Only for radio type
    customisations: CustomisationField[];
}

export type Schema = SchemaField[];

export interface TableRow {
    [key: string]: string;
}

export interface Table {
    schema: Schema;
    rows: TableRow[];
}

export interface Tree {
    name: string;
    type: TreeType;
    table: Table;

    /* in the future make it so that one tree can have many tables
    and be modified by them. Right now, it's one table per tree.*/

    // tables: tables[]

    /* In the future a tree will have an ID and be referenced by it */
    // id: string
}


export const SupportedTypes = [
    "text",
    "longtext",
    "options",
    "multiple - Not implemeted",
    "number - Not implemented",
    "yes/no",
    "date - see design",
    "user - Not implemented",
    "image - Not implemented",
    "file - Not implemented",
    "url - Not implemented"
];

export const SupportedTreesTypes = {
    "Basic": new BasicTree(),
    "Pilea": new Pilea(),
    "Space": new Space(),

    // "Pond": new TreeType('Pond', 'lightpink', 0.5, 0.5, 'pink'),

    // "Serene" will be the serene line art image. see memories/serene.jpg
    // THe idea here is to have something like an image, of a person then with flowers on their head.
}