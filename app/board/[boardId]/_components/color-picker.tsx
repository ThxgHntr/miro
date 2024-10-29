'use client'

import { colorToCss } from "@/lib/utils"
import { Color } from "@/types/canvas"

interface ColorPickerProps {
    onChange: (color: Color) => void
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[124px] pr-2 mr-2 border-r border-netral-200">
            {/* Dark Red */}
            <ColorButton onClick={onChange} color={{ r: 139, g: 0, b: 0 }} />
            {/* Dark Orange */}
            <ColorButton onClick={onChange} color={{ r: 184, g: 82, b: 0 }} />
            {/* Olive */}
            <ColorButton onClick={onChange} color={{ r: 204, g: 204, b: 0 }} />
            {/* Dark Green */}
            <ColorButton onClick={onChange} color={{ r: 0, g: 100, b: 0 }} />
            {/* Dark Cyan */}
            <ColorButton onClick={onChange} color={{ r: 0, g: 139, b: 139 }} />
            {/* Dark Blue */}
            <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 139 }} />
            {/* Dark Violet */}
            <ColorButton onClick={onChange} color={{ r: 153, g: 50, b: 204 }} />
            {/* Dark Pink */}
            <ColorButton onClick={onChange} color={{ r: 139, g: 69, b: 75 }} />
            {/* Dark Indigo */}
            <ColorButton onClick={onChange} color={{ r: 48, g: 25, b: 52 }} />
        </div>
    )
}

interface ColorButtonProps {
    color: Color
    onClick: (color: Color) => void
}

const ColorButton = ({ color, onClick }: ColorButtonProps) => {
    return (
        <button className="flex items-center justify-center w-8 h-8 hover:opacity-75 transition"
            onClick={() => onClick(color)}>
            <div
                className="w-8 h-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}>
            </div>
        </button>
    )
}
