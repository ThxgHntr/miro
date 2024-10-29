import { getSvgPathFromStroke } from "@/lib/utils"
import getStroke from "perfect-freehand"

interface PathProps {
    x: number,
    y: number,
    points: number[][],
    fill: string,
    onPointerDown?: (e: React.PointerEvent) => void,
    stroke?: string
}

export const Path = (props: PathProps) => {
    return (
        <path
            className="drop-shadow-md"
            onPointerDown={props.onPointerDown}
            style={{
                transform: `translate(${props.x}px, ${props.y}px)`,
            }}
            d={getSvgPathFromStroke(
                getStroke(
                    props.points,
                    {
                        size: 16,
                        thinning: 0.5,
                        smoothing: 0.5,
                        streamline: 0.5
                    }
                ))}
            x={0}
            y={0}
            fill={props.fill}
            stroke={props.stroke}
            strokeWidth={1}
        />
    )
}