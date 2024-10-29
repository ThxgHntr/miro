import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Color, Layer } from "./types/canvas";

declare global {
  interface Liveblocks {
    // Each user's Presence, for room.getPresence, room.subscribe("others"), etc.

    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number } | null
      selection: string[]
      pencilDraft: [x: number, y: number, pressure: number][] | null
      penColor: Color | null
    };

    // The Storage tree for the room, for room.getStorage, room.subscribe(storageItem), etc.
    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>
      layerIds: LiveList<string>
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id?: string
      info?: {
        name?: string
        picture?: string
      };
    };

    // Custom events, for room.broadcastEvent, room.subscribe("event")
    RoomEvent: {};
    // Example has two events, using a union
    // | { type: "PLAY" } 
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for use in React
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for use in React
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}

export {

};
