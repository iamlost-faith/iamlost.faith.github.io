import TreeType from "./TreeType";

class Space implements TreeType {
    readonly defaultLeaf: string = '🍃';
    readonly defaultLeafSize: number = 1;
    readonly defaultAction: string = 'leaf';
    readonly defaultValues: { [key: string]: string | number } = {
        'leaf': '🍃',
        'size': this.defaultLeafSize,
        'action': 'fall'
    };

    askSettings(handleChangeCustomisations: any, index: number, setting: any, type: string): React.ReactElement {
        console.log('Space, settinnnng', setting);
        return (
            <>
                <span className='mx-1 text-slate-500'>Set</span>
                <select
                    className='border rounded-md'
                    value={setting.action}
                    onChange={(e) => handleChangeCustomisations(index, 'action', e.target.value)}
                >
                    <option value="leaf">leaf</option>
                    <option value="size">size</option>
                    <option value="action">action</option>
                </select>
                <span className='mx-1'>To</span>
                {setting.action === 'leaf' ? (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="🍃">🍃</option>
                        <option value="🌸">🌸</option>
                        <option value="☘️">☘️</option>
                        <option value="🍀">🍀</option>
                        <option value="🍂">🍂</option>
                    </select>
                ) : setting.action === 'size' ? (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="0.1">0.1</option>
                        <option value="0.3">0.3</option>
                        <option value="0.5">0.5</option>
                        <option value="0.7">0.8</option>
                        <option value="1">01</option>
                    </select>
                ) : (
                    <select className='border rounded-md' value={setting.value} onChange={(e) => handleChangeCustomisations(index, 'value', e.target.value)}>
                        <option value="notify-me">Notify me</option>
                        <option value="notify-user">Notify user</option>
                        <option value="blink">Blink</option>
                        {type === 'date' && <option value="notify">Notify me</option>}
                    </select>)}
            </>
        );
    }

    askProperty(value: string, property: string): string {
        switch (true) {
            case (typeof value === 'undefined' && property === "size"):
                return this.defaultLeafSize.toString();
            case (typeof value === 'undefined' && property === "leaf"): // hum, what if Pond also comes here?
                return this.defaultLeaf;
            default:
                return value;
        }
    }
}

export default Space;