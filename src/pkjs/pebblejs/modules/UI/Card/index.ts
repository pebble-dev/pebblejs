// card

import { WindowStack } from "../WindowStack";
import { PebbleWindow, ActionDef } from "../Window";
import { PacketQueue } from "../../../util/appMessage";
import { CardTextPacket, WindowPropsPacket, WindowShowPacket } from "../../../util/packets";
 

export class Card extends PebbleWindow {
    private _title: string;
    private _subtitle: string;
    private _body: string;

    constructor(windowStack: WindowStack, packetQueue: PacketQueue, title: string, subtitle: string, body: string, action: ActionDef | null = null, fullscreen: boolean = false, scrollable: boolean = false) {
        super(windowStack, packetQueue, action, fullscreen, scrollable);
        this._title = title;
        this._subtitle = subtitle;
        this._body = body;    
    }

    get title(): string {
        return this._title;
    }

    get subtitle(): string {
        return this._subtitle;
    }

    get body(): string {
        return this._body;
    }

    public override show(): void {
        this._windowStack.push(this);

        // 0. send WindowShowPacket
        let packet = new WindowShowPacket('card', true);
        this._packetQueue.add(packet);

        // 1. send WindowPropsPacket
        packet = new WindowPropsPacket(1, false, this.scrollable);
        this._packetQueue.add(packet);

        // 2. TODO: status bar, action layer
        // 3. send CardTextPacket
        packet = new CardTextPacket(0, this.title);
        this._packetQueue.add(packet);
        packet = new CardTextPacket(1, this.subtitle);
        this._packetQueue.add(packet);
        packet = new CardTextPacket(2, this.body);
        this._packetQueue.add(packet);



    }
}