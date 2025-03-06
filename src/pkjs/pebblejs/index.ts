///
/// Pebble.js
/// 

import { PacketQueue } from "./util/appMessage";
import { onAppMessage, ReadyPacket } from "./util/packets";
import { UI } from "./modules/UI";
import { DefaultWindowStack, WindowStack } from "./modules/UI/WindowStack";

interface PebbleJS {
    // nothing for now
}

class PebbleJS implements PebbleJS {
    private _packetQueue: PacketQueue = new PacketQueue();
    private _windowStack: WindowStack = new DefaultWindowStack(this._packetQueue);

    constructor() {
        console.log("Loaded PebbleJS. Let's go!");
        let packet: ReadyPacket = new ReadyPacket();
        this._packetQueue.add(packet);

        Pebble.addEventListener("appmessage", (e) => {
            onAppMessage(e);
        });
    }

    public UI(): UI {
        return new UI(this._windowStack, this._packetQueue);
    }
}

export { PebbleJS };