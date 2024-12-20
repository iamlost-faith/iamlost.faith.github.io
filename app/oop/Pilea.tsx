import TreeType from "./TreeType";

class Pilea implements TreeType {
    readonly defaultLeafColor: string = 'green';
    readonly defaultLeafSize: number = 0.5;
    readonly defaultStrokeWidth: number = 0.5;
    readonly defaultStrokeColor: string = 'darkgreen';
    readonly defaultAction: string = 'color';
    readonly defaultValues: { [key: string]: string | number } = {
        'color': '#00ff00',
        'size': 0.3,
        'stroke-width': 0.5,
        'stroke-color': 'darkgreen',
        'action': 'fall'
    };

    askSettings(handleChangeCustomisations: any, index: number, setting: any, type: string): React.ReactElement {
        return (
            <>
                <span className='mx-1 text-slate-500'>Set</span>
                <select
                    className='border rounded-md'
                    value={setting.action}
                    onChange={(e) => handleChangeCustomisations(index, 'action', e.target.value)}
                >
                    <option value="color">color</option>
                    <option value="size">size</option>
                    <option value="stroke-width">outline-width</option>
                    <option value="stroke-color">outline-color</option>
                    <option value="action">action</option>
                </select>
                <span className='mx-1'>To</span>
                {setting.action === 'color' ? (
                    <input type="color" value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)} />
                ) : setting.action === 'size' ? (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="0.3">0.3</option>
                        <option value="0.7">0.7</option>
                        <option value="1">1</option>
                    </select>
                ) : setting.action === 'stroke-width' ? (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="0.5">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                    </select>
                ) : setting.action === 'stroke-color' ? (
                    <input type="color" value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)} />
                ) : (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="fall">Fall</option>
                        <option value="wither">Wither</option>
                        <option value="bud">Bud</option>
                        <option value="bloom">Bloom</option>
                        <option value="fruit">Fruit</option>
                        <option value="notify">Notify me</option>
                        <option value="notify">Notify user</option>
                    </select>)}
            </>
        );
    }

    askProperty(value: string, property: string): string {
        switch (true) {
            case (typeof value === 'undefined' && property === "color"):
                return this.defaultLeafColor;
            case (typeof value === 'undefined' && property === "size"):
                return this.defaultLeafSize.toString();
            case (typeof value === 'undefined' && property === "stroke-width"):
                return this.defaultStrokeWidth.toString();
            case (typeof value === 'undefined' && property === "stroke-color"):
                return this.defaultStrokeColor;
            default:
                return value;
        }
    }
}

export default Pilea;