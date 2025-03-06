///
/// Ensure order and delivery of messages to the watch.
///

import { CommandPackets, Packet } from "./packets";

class MessageQueue {
    private queue: any[] = [];
    private sending: boolean = false;
    private sent: any;

    stop() {
        this.sending = false;
    }

    consume() {
        this.queue.shift();
        if (this.queue.length === 0) {
            return this.stop();
        }
        this.cycle();
    }

    checkSent(message: any, fn: () => void) {
        return () => {
            if (message === this.sent) {
                fn();
            }
        };
    }

    cycle() {
        if (!this.sending) {
            return;
        }
        const head = this.queue[0];
        if (!head) {
            return this.stop();
        }
        this.sent = head;
        const success = this.checkSent(head, this.consume.bind(this));
        const failure = this.checkSent(head, this.cycle.bind(this));
        Pebble.sendAppMessage(head, success, failure);
    }

    send(message: any) {
        this.queue.push(message);
        if (this.sending) {
            return;
        }
        this.sending = true;
        this.cycle();
    }
}

export class PacketQueue {
    private message: number[] = [];
    private timeout: NodeJS.Timeout | null = null;
    private platform: string = Pebble.getActiveWatchInfo().platform;
    private maxPayloadSize: number = (this.platform === 'aplite' ? 1024 : 2044) - 32;
    private messageQueue: MessageQueue = new MessageQueue();

    add(packet: Packet) {
        const byteArray = toByteArray(packet);
        if (this.message.length + byteArray.length > this.maxPayloadSize) {
            this.send();
        }
        this.message.push(...byteArray);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.send.bind(this), 0);
    }

    send() {
        if (this.message.length === 0) {
            return;
        }
        this.messageQueue.send({ 0: this.message });
        this.message = [];
    }
}

function typeIndex(type: CommandPackets): number {
    return type;
}

function toByteArray(packet: Packet): number[] {
    const type = typeIndex(packet.view.getUint16(0, true));
    const size = Math.max(packet.size, packet.cursor);
    packet.packetType(type);
    packet.packetLength(size);

    const buffer = packet.view;
    const byteArray = new Array(size);
    for (let i = 0; i < size; ++i) {
        byteArray[i] = buffer.getUint8(i);
    }

    return byteArray;
}

