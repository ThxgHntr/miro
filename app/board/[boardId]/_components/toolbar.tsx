import { Skeleton } from "@/components/ui/skeleton"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"

interface ToolbarProps {
    canvasState: CanvasState
    setCanvasState: (newState: CanvasState) => void
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean
}

export const Toolbar = (props: ToolbarProps) => {
    return (
        <div className="absolute flex flex-col gap-y-4 left-2 top-[50%] -translate-y-[50%]">
            <div className="flex flex-col gap-y-1 items-center p-1.5 bg-white rounded-md shadow-md">
                <ToolButton
                    label="指針"
                    icon="pointer"
                    onClick={() => props.setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        props.canvasState.mode === CanvasMode.None ||
                        props.canvasState.mode === CanvasMode.Pressing ||
                        props.canvasState.mode === CanvasMode.SelectionNet ||
                        props.canvasState.mode === CanvasMode.Translating ||
                        props.canvasState.mode === CanvasMode.Resizing
                    } />
                <ToolButton
                    label="テキス"
                    icon="type"
                    onClick={() => props.setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Text
                    })}
                    isActive={
                        props.canvasState.mode === CanvasMode.Inserting &&
                        props.canvasState.layerType === LayerType.Text
                    } />
                <ToolButton
                    label="付箋"
                    icon="stickynote"
                    onClick={() => props.setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note
                    })}
                    isActive={
                        props.canvasState.mode === CanvasMode.Inserting &&
                        props.canvasState.layerType === LayerType.Note
                    } />
                <ToolButton
                    label="矩形"
                    icon="square"
                    onClick={() => props.setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle
                    })}
                    isActive={
                        props.canvasState.mode === CanvasMode.Inserting &&
                        props.canvasState.layerType === LayerType.Rectangle
                    } />
                <ToolButton
                    label="楕円"
                    icon="circle"
                    onClick={() => props.setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse
                    })}
                    isActive={
                        props.canvasState.mode === CanvasMode.Inserting &&
                        props.canvasState.layerType === LayerType.Ellipse
                    } />
                <ToolButton
                    label="ペン"
                    icon="pencil"
                    onClick={() => props.setCanvasState({
                        mode: CanvasMode.Pencil,
                    })}
                    isActive={props.canvasState.mode === CanvasMode.Pencil} />
            </div>
            <div className="flex flex-col gap-y-1 items-center p-1.5 bg-white rounded-md shadow-md">
                <ToolButton
                    label="戻す"
                    icon="undo"
                    onClick={props.undo}
                    isDisabled={!props.canUndo} />
                <ToolButton
                    label="直す"
                    icon="redo"
                    onClick={props.redo}
                    isDisabled={!props.canRedo} />
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute flex flex-col p-1.5 h-[360px] w-[52px] left-2 top-[50%] -translate-y-[50%] bg-white rounded-md shadow-md">
            <Skeleton className="h-full w-full bg-white" />
        </div>
    )
}