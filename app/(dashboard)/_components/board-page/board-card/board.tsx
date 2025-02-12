'use client'

import Image from "next/image"

interface BoardProps {
    imgUrl: string
    title: string
    description: string
    children?: React.ReactNode
}

export const Board = (props: BoardProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={props.imgUrl}
                alt={props.title}
                width={200}
                height={200}
            />
            <h2 className="text-2xl font-semibold mt-6">
                {props.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                {props.description}
            </p>
            <div>
                {props.children}
            </div>
        </div>
    )
}