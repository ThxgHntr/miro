'use client'

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react"
import { Rectangle } from "./rectangle"
import { memo } from "react"
import { Elllipse } from "./ellipse"
import { Text } from "./text"
import { Note } from "./note"
import { Path } from "./path"
import { colorToCss } from "@/lib/utils"

interface LayerPreviewProps {
    id: string
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

export const LayerPreview = memo((props: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(props.id))

    if (!layer) {
        return null
    }

    switch (layer.type) {
        case LayerType.Text:
            return (
                <Text
                    id={props.id}
                    layer={layer}
                    onPointerDown={props.onLayerPointerDown}
                    selectionColor={props.selectionColor} />
            )
        case LayerType.Note:
            return (
                <Note
                    id={props.id}
                    layer={layer}
                    onPointerDown={props.onLayerPointerDown}
                    selectionColor={props.selectionColor} />
            )
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={props.id}
                    layer={layer}
                    onPointerDown={(e) => props.onLayerPointerDown(e, props.id)}
                    selectionColor={props.selectionColor} />
            )
        case LayerType.Ellipse:
            return (
                <Elllipse
                    id={props.id}
                    layer={layer}
                    onPointerDown={props.onLayerPointerDown}
                    selectionColor={props.selectionColor} />
            )
        case LayerType.Path:
            return (
                <Path
                    key={props.id}
                    points={layer.points ?? []}
                    onPointerDown={(e) => props.onLayerPointerDown(e, props.id)}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                    stroke={props.selectionColor} />
            )

        default:
            console.warn("未知のレイヤータイプ")
            return null

    }
})

LayerPreview.displayName = "LayerPreview"
