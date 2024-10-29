'use client'

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
    isFavorite: boolean;
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    orgId: string;
    onClick: () => void;
    disable?: boolean;
}

export const Footer = (props: FooterProps) => {
    return (
        <div className="relative bg-white p-3">
            <div className="flex items-center justify-between">
                <div className="flex flex-col justify-between">
                    <p className="text-sm truncate max-w-[100%-20px]">
                        {props.title}
                    </p>
                    <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                        {props.authorLabel}, {props.createdAtLabel}
                    </p>
                </div>
                <button
                    onClick={props.onClick}
                    disabled={props.disable}
                    className={cn(props.disable && "cursor-progress opacity-75")} >
                    <Star className={cn("h-5 w-5",
                        props.isFavorite
                            ? "fill-yellow-300 hover:fill-yellow-400 opacity-75"
                            : "hover:fill-yellow-400 opacity-50")} />
                </button>
            </div>
        </div>
    )
}