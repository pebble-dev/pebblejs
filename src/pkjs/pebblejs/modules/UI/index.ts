// ui

import { WindowStack } from "./WindowStack";
import { ActionDef } from "./Window";
import { Card } from "./Card";
import { PacketQueue } from "../../util/appMessage";


export class UI {
    windowStack: WindowStack;
    packetQueue: PacketQueue;

    constructor(windowStack: WindowStack, packetQueue: PacketQueue) {
        this.windowStack = windowStack;
        this.packetQueue = packetQueue
    }

    /**
     * Create a new card
     * @param title Card title
     * @param subtitle Card subtitle
     * @param body Card body
     * @param action Card action
     * @param fullscreen Fullscreen card (hide the status bar)
     * @param scrollable Scrollable card
     * @returns Card
     */
    public Card(title: string, subtitle: string, body: string, action: ActionDef | null = null, fullscreen: boolean = false, scrollable: boolean = false): Card {
        return new Card(this.windowStack, this.packetQueue, title, subtitle, body, action, fullscreen, scrollable);
    }
}