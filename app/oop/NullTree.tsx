import TreeType from "./TreeType";

class NullTree implements TreeType {
    readonly defaultLeafSize: number = 1;
    readonly defaultAction: string = '';
    readonly defaultValues: { [key: string]: string | number } = {
        '': '',
    };

    askSettings(handleChangeCustomisations: any, index: number, setting: any, type: string): React.ReactElement {
        console.log('Space, settinnnng', setting);
        return (
            <>
            </>
        );
    }

    askProperty(value: string, property: string): string {
        return '';
    }
}

export default NullTree;