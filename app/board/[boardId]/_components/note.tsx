import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { Poppins } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

const font = Poppins({
    subsets: ["latin"],
    weight: ["400"]
});

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96
    const scalFactor = 0.15
    const fontSizeBasedOnHeight = height * scalFactor
    const fontSizeBasedOnWidth = width * scalFactor
    const fontSize = Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
    return fontSize
}

interface NoteProps {
    id: string
    layer: NoteLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Note = (props: NoteProps) => {
    const { x, y, height, width, fill, value } = props.layer

    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers")

        liveLayers.get(props.id)?.set("value", newValue)
    }, [])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => props.onPointerDown(e, props.id)}
            style={{
                outline: props.selectionColor ? "1px solid " + props.selectionColor : "none",
                backgroundColor: fill ? colorToCss(fill) : "#000",
            }}
            className="shadow-md drop-shadow-xl"
            radius={5}>
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn("h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none", font.className)}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? getContrastingTextColor(fill) : "#000",
                }} />
        </foreignObject>
    )
}
