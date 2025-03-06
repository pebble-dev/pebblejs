import { PacketQueue } from "../../../util/appMessage";
import { WindowStack } from "../WindowStack";

type Color = 'black' | 'white';

export type ActionDef = {
    up: string,
    select: string,
    down: string,
    backgroundColor: Color,
}


export class PebbleWindow {
    private _action: ActionDef | null;
    private _fullscreen: boolean;
    private _scrollable: boolean;
    private _id: number;
    protected _windowStack: WindowStack;
    protected _packetQueue: PacketQueue;

    constructor(windowStack: WindowStack, packetQueue: PacketQueue, action: ActionDef | null = null, fullscreen: boolean = false, scrollable: boolean = false) {
        this._action = action;
        this._fullscreen = fullscreen;
        this._scrollable = scrollable;
        this._windowStack = windowStack;
        this._packetQueue = packetQueue;
    }


    get action(): ActionDef | null {
        return this._action;
    }

    get fullscreen(): boolean {
        return this._fullscreen;
    }

    get scrollable(): boolean {
        return this._scrollable;
    }

    get id(): number {
        return this._id;
    }

    public show(): void {
        this._windowStack.push(this);
    }

    public hide(): void {
        this._windowStack.remove(this);
    }
}
