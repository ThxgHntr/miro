'use client'

import { ReactNode, useEffect, useState } from "react"
import {
    LiveblocksProvider,
    RoomProvider,
} from "@liveblocks/react"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client"
import { Layer } from "@/types/canvas"

interface RoomProps {
    children: ReactNode
    boardId: string
    fallback: NonNullable<ReactNode> | null
}

export const Room = ({ children, boardId, fallback }: RoomProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetch("/api/liveblocks-auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ room: boardId }),
                })
                setIsAuthenticated(response.ok)
            } catch (error) {
                console.error("Error authenticating:", error)
                setIsAuthenticated(false)
            }
        }

        authenticate()
    }, [boardId])

    if (!isAuthenticated) {
        return fallback
    }

    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
            <RoomProvider
                id={boardId}
                initialPresence={{
                    cursor: null,
                    selection: [],
                    pencilDraft: null,
                    penColor: null,
                }}
                initialStorage={{
                    layers: new LiveMap<string, LiveObject<Layer>>(),
                    layerIds: new LiveList([]),
                }}>
                {children}
            </RoomProvider>
        </LiveblocksProvider>
    )
}
