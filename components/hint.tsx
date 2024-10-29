import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface HintProps {
    children: React.ReactNode
    label: string
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    sideOffset?: number
    alignOffset?: number
}

export const Hint = (props: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <div
                        className="cursor-help"
                        data-tip
                        data-tip-content={props.label}
                    >
                        {props.children}
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    className="text-white bg-black border-black"
                    side={props.side}
                    align={props.align}
                    sideOffset={props.sideOffset}
                    alignOffset={props.alignOffset}
                >
                    <p className="font-semibold capitalize">
                        {props.label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}