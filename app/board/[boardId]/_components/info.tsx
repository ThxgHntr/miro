'use client'

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { RenameModal } from "@/app/(dashboard)/_components/board-page/board-card/dropdown/rename-modal"
import { Separator } from "@/components/ui/separator"

interface InfoProps {
    boardId: Id<"boards">
}

export const Info = ({ boardId }: InfoProps) => {
    const data = useQuery(api.board.get, { boardId:boardId })

    if (!data) return (<InfoSkeleton />)

    return (
        <div className="absolute flex gap-x-2 items-center p-1.5 h-12 top-2 left-2 bg-white rounded-xl shadow-md">
            <Hint
                label="ミロ"
                side="bottom"
                align="center"
                sideOffset={10}>
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="ミロ"
                        width={40}
                        height={40}
                    />
                </Link>
            </Hint>
            <Separator orientation="vertical" />
            <RenameModal
                title="ボードタイトルを編集"
                description="このボードの新しいタイトルを入力してください"
                boardId={data._id}
                name={data.title}>
                <Button asChild variant="board">
                    <span className="font-semibold text-xl text-black p-2">
                        {data.title}
                    </span>
                </Button>

            </RenameModal>
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="absolute flex items-center w-[300px] p-1.5 h-12 top-2 left-2 bg-white rounded-md shadow-md">
            <Skeleton className="h-full w-full bg-white" />
        </div>
    )
}