'use client'

import Image from "next/image"
import {
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Hint } from "@/components/hint"

interface ItemProps {
    id: string,
    name: string,
    imageUrl: string
}

export const Item = (props: ItemProps) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === props.id

    const onClick = () => {
        if (!setActive) return
        setActive({ organization: props.id })
    }

    return (
        <div className="aspect-square relative">
            <Hint
                label={props.name}
                side="right"
                align='center'
                sideOffset={10}
            >
                <Image
                    alt={props.name}
                    src={props.imageUrl}
                    width={120}
                    height={120}
                    onClick={onClick}
                    className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition", isActive && "opacity-100")} />
            </Hint>
        </div>
    )
}