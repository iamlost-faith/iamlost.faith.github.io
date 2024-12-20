export default interface TreeType {
    defaultLeafColor?: string;
    defaultLeafSize?: number;
    defaultStrokeWidth?: number;
    defaultStrokeColor?: string;
    defaultLeaf?: string;
    defaultAction: string;
    defaultValues: { [key: string]: string | number };

    askSettings(handleChangeCustomisations: any, index: number, setting: any, type: string): React.ReactElement;

    askProperty(value: string, propertyName: string): string;
}