import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"

interface ToolButtonProps {
    label: string
    onClick: () => void
    isActive?: boolean
    isDisabled?: boolean
    icon: string
}

export const ToolButton = (props: ToolButtonProps) => {
    return (
        <Hint label={props.label} side="right" sideOffset={14}>
            <Button
                disabled={props.isDisabled}
                variant={props.isActive ? "boardActive" : "board"}
                onClick={props.onClick}>
                {
                    (props.icon === "pointer" && <MousePointer2 />) ||
                    (props.icon === "type" && <Type />) ||
                    (props.icon === "stickynote" && <StickyNote />) ||
                    (props.icon === "square" && <Square />) ||
                    (props.icon === "circle" && <Circle />) ||
                    (props.icon === "pencil" && <Pencil />) ||
                    (props.icon === "undo" && <Undo2 />) ||
                    (props.icon === "redo" && <Redo2 />)
                }
            </Button>
        </Hint>
    )
}