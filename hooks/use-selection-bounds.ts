import { Layer, XYWH } from "@/types/canvas"
import { shallow, useSelf, useStorage } from "@liveblocks/react"

const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0]

    if (!first) {
        return null
    }

    let top = first.y
    let left = first.x
    let bottom = first.y + first.height
    let right = first.x + first.width

    for (const layer of layers) {
        const { x, y, width, height } = layer

        if (top > y) {
            top = y
        }

        if (left > x) {
            left = x
        }

        if (bottom < y + height) {
            bottom = y + height
        }

        if (right < x + width) {
            right = x + width
        }
    }

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    }
}

export const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection)

    return useStorage((root) => {
        const selectedLayers = selection?.map((layerId) => root.layers.get(layerId)!).filter(Boolean)

        return selectedLayers ? boundingBox(selectedLayers) : null
    }, shallow)
}