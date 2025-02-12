'use client'

import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { LayerType, Side, XYWH } from "@/types/canvas"
import { useSelf, useStorage } from "@liveblocks/react"
import { memo } from "react"

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(({
    onResizeHandlePointerDown
}: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )

    const isShowingHandles = useStorage((root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )

    const bounds = useSelectionBounds()

    if (!bounds) {
        return null
    }

    return (
        <>
            {/* main box */}
            <rect
                className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
                x={0}
                y={0}
                style={{
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                    width: bounds.width,
                    height: bounds.height,
                }}
            />

            {/* resize handle boxes */}
            {isShowingHandles && (
                <>
                    {/* top left corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
                        }}
                    />

                    {/* top middle corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "n-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top, bounds)
                        }}
                    />

                    {/* top right corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ne-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
                        }}
                    />

                    {/* middle right corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Right, bounds)
                        }}
                    />

                    {/* bottom right corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "se-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
                        }}
                    />

                    {/* bottom middle corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom, bounds)
                        }}
                    />

                    {/* bottom left corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "sw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
                        }}
                    />

                    {/* middle left corner */}
                    <rect
                        className="fill-white stroke-blue-500 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Left, bounds)
                        }}
                    />
                </>
            )}
        </>
    )
})

SelectionBox.displayName = "SelectionBox"