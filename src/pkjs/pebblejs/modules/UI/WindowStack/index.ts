///
/// WindowStack implementation
///

import { PacketQueue } from "../../../util/appMessage";
import { PebbleWindow } from "../Window";



export interface WindowStack {
    // push, pop, top, length, get
    push(window: PebbleWindow): void,
    pop(): void,
    top(): PebbleWindow,
    length(): number,
    get(index: number): PebbleWindow,
    remove: (window: PebbleWindow) => void,
}

export class DefaultWindowStack implements WindowStack {
    private packetQueue: PacketQueue;
    private windows: PebbleWindow[] = [];

    public constructor(packetQueue: PacketQueue) {
        this.packetQueue = packetQueue;
    }


    push(window: PebbleWindow): void {
        this.windows.push(window);
    }

    pop(): void {
        this.windows.pop();
    }

    top(): PebbleWindow {
        return this.windows[this.windows.length - 1];
    }

    length(): number {
        return this.windows.length;
    }

    get(index: number): PebbleWindow {
        return this.windows[index];
    }

    remove(window: PebbleWindow): void {
        const index = this.windows.indexOf(window);
        if (index > -1) {
            this.windows.splice(index, 1);
        }
    }
}