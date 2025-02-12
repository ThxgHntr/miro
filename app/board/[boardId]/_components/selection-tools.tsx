'use client'

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera
    setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)

    const bringToFront = useMutation((
        { storage }
    ) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
        }
    }, [selection])

    const sendToBack = useMutation((
        { storage }
    ) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i)
        }
    }, [selection])

    const setFill = useMutation((
        { storage },
        fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill)

        selection?.forEach((layerId) => {
            liveLayers.get(layerId)?.set("fill", fill)
        })
    }, [selection, setLastUsedColor])

    const deleteLayers = useDeleteLayers()

    const selectionBounds = useSelectionBounds()

    if (!selectionBounds) return null

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    return (
        <div
            className="absolute flex p-3 bg-white border rounded-xl shadow-sm select-none"
            style={{
                transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`
            }}>
            <ColorPicker
                onChange={setFill}
            />
            <div className="flex flex-col gap-y-0.5">
                <Hint label="前に持ってくる" side="right" sideOffset={10}>
                    <Button onClick={bringToFront} variant="board" size="icon">
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="返送してくる" side="right" sideOffset={10}>
                    <Button onClick={sendToBack} variant="board" size="icon">
                        <SendToBack />
                    </Button>
                </Hint>
                <Hint label="消去" side="right" sideOffset={10}>
                    <Button variant="board" size="icon" onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

SelectionTools.displayName = "SelectionTool"