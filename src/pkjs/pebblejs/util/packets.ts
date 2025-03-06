///
/// Packet utilities
///

export enum CommandPackets {
    Packet,
    SegmentPacket,
    ReadyPacket,
    LaunchReasonPacket,
    WakeupSetPacket,
    WakeupSetResultPacket,
    WakeupCancelPacket,
    WakeupEventPacket,
    WindowShowPacket,
    WindowHidePacket,
    WindowShowEventPacket,
    WindowHideEventPacket,
    WindowPropsPacket,
    WindowButtonConfigPacket,
    WindowStatusBarPacket,
    WindowActionBarPacket,
    ClickPacket,
    LongClickPacket,
    ImagePacket,
    CardClearPacket,
    CardTextPacket,
    CardImagePacket,
    CardStylePacket,
    VibePacket,
    LightPacket,
    AccelPeekPacket,
    AccelConfigPacket,
    AccelDataPacket,
    AccelTapPacket,
    MenuClearPacket,
    MenuClearSectionPacket,
    MenuPropsPacket,
    MenuSectionPacket,
    MenuGetSectionPacket,
    MenuItemPacket,
    MenuGetItemPacket,
    MenuSelectionPacket,
    MenuGetSelectionPacket,
    MenuSelectionEventPacket,
    MenuSelectPacket,
    MenuLongSelectPacket,
    StageClearPacket,
    ElementInsertPacket,
    ElementRemovePacket,
    ElementCommonPacket,
    ElementRadiusPacket,
    ElementAnglePacket,
    ElementAngle2Packet,
    ElementTextPacket,
    ElementTextStylePacket,
    ElementImagePacket,
    ElementAnimatePacket,
    ElementAnimateDonePacket,
    VoiceDictationStartPacket,
    VoiceDictationStopPacket,
    VoiceDictationDataPacket,
};

enum CardTextTypes {
    Title,
    Subtitle,
    Body,
}


export class Packet {
    protected _view: DataView;
    protected _cursor: number;
    protected _size: number;

    constructor(size: number) {
        this._view = new DataView(new ArrayBuffer(size));
        this._cursor = 0;
        this._size = size;
    }

    packetType(type: number): void {
        this._view.setUint16(0, type, true);
    }

    packetLength(length: number): void {
        this._view.setUint16(2, length, true);
    }

    get view(): DataView {
        return this._view;
    }

    get cursor(): number {
        return this._cursor;
    }

    get size(): number {
        return this._size;
    }
}

export class ReadyPacket extends Packet {
    constructor() {
        super(4); // Assuming the size of ReadyPacket is 4 bytes
    }
}

export class WindowShowPacket extends Packet {
    constructor(type: 'window' | 'card' | 'menu', pushing: boolean) {
        super(6); 
        this.packetType(CommandPackets.WindowShowPacket);
        this._view.setUint8(4, type === 'window' ? 0 : type === 'card' ? 1 : 2);
        this._view.setUint8(5, pushing ? 1 : 0);

    }
}

export class WindowPropsPacket extends Packet {
    constructor(id: number, paging: boolean, scrollable: boolean) {
        super(11);
        this.packetType(CommandPackets.WindowPropsPacket);
        this._view.setUint32(4, id, true);
        this._view.setUint8(8, paging ? 1 : 0);
        this._view.setUint8(9, scrollable ? 1 : 0);
        // background color is white
        this._view.setUint8(10, 0xFF);
    }
}

export class CardTextPacket extends Packet {
    constructor(index: CardTextTypes, text: string) {
        super(5 + text.length + 1);
        this.packetType(CommandPackets.CardTextPacket);
        this._view.setUint8(4, index);
        for (let i = 0; i < text.length; i++) {
            this._view.setUint8(5 + i, text.charCodeAt(i));
        }
        this._view.setUint8(5 + text.length, 0x3F);

        
    }
}
        

export class WindowShowEventPacket extends Packet { // event packets are data received from the watch
    // uint32 id
    constructor(id: number) {
        super(6); 
        this.packetType(CommandPackets.WindowShowEventPacket);
        this._view.setUint32(4, id, true);
    }
}

function toArrayBuffer(array: any[], length: number): DataView<ArrayBuffer> {
    let buffer = new ArrayBuffer(length);
    let view = new DataView(buffer);

    for (let i = 0; i < length; i++) {
        view.setUint8(i, array[i]);
    }

    return view;
}

export function onAppMessage(e: any) {
    let data = e.payload[0];

    let offset = 0;
    let length = data.length;
    let partial = {
        view: null,
        offset: 0,
        length: 0,
    }

    partial.view = toArrayBuffer(data, length);

    do {
        onPacket(partial.view, partial.offset);
        partial.length = partial.view.getUint16(partial.offset + 2, true);

        partial.offset = offset;
        offset += partial.length;
    } while (offset !== 0 && offset < length);
}

function onPacket(view, offset) {
    let type = view.getUint16(offset, true);
    let length = view.getUint16(offset + 2, true);
    console.log(`onPacket: type=${type}, length=${length}`);

    switch (type) {
        case CommandPackets.WindowShowEventPacket:
            let id = view.getUint32(offset + 4, true);
            console.log(`WindowShowEventPacket: id=${id}`);
            // construct a new WindowShowEventPacket
            let packet = new WindowShowEventPacket(id);
            // onWindowShowEventPacket(packet);

            break;
    }
}



// Size Cheatsheet:
/*
   uint8_t: 1 byte
    uint16_t: 2 bytes
    uint32_t: 4 bytes
    uint64_t: 8 bytes
    int8_t: 1 byte
    int16_t: 2 bytes
    int32_t: 4 bytes
    int64_t: 8 bytes
    float: 4 bytes
    double: 8 bytes
*/
