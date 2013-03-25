
///#region Interfaces
export interface ICollection {
    forEach(op: Function): void;
    toArray(): any[];
    add(elem: any): void;
    remove(elem: IUnique): void;
    removeById(id: string): void;
    get (id: string): void;
    length: number;
}

export interface IUnique {
    uid: string;
}

interface UniqueHash {
    [id: string]: IUnique;
}
///#endregion

/// Based on: https://github.com/montagejs/collections/blob/master/shim-object.js#L73
function generateHash(): string {
    return Math.random().toString(36).slice(2);
}

export class Collection implements ICollection {
    private _items = <UniqueHash>{};

    private _length = 0;
    public get length(): number { return this._length; }

    public get (id: string): IUnique {
        if (!this._items[id]) return null;
        else return this._items[id];
    }

    private getHash() {
        var hash = generateHash();
        while (this._items[hash] !== undefined) hash = generateHash();
        return hash;
    }

    public add(elem: any): void {
        if (!elem.uid) {
            elem.uid = this.getHash();
        }
        this._items[elem.uid] = elem;
        this._length++;
    }

    public remove(elem: IUnique): void {
        this.removeById(elem.uid);
    }

    public removeById(id: string): void {
        this._items[id] = undefined;
        this._length--;
    }

    public forEach(op: (elem: IUnique, id: string, i: number, list: Collection) => void ) {
        var i = 0;
        for (var id in this._items) {
            op(this._items[id], id, i++, this);
        }
    }

    public toArray(): IUnique[] {
        var arr: IUnique[] = new Array(this.length);
        this.forEach((elem, id, i) => { arr[i] = elem; });
        return arr;
    }
}

export function toUnique(obj: any, id: string): IUnique {
    obj.uid = id;
    return <IUnique> obj;
}