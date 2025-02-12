'use client'

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "./dropdown/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface BoardCardProps {
    boardId: Id<"boards">
    title: string
    authorName: string
    authorId: string
    createdAt: number
    imageUrl: string
    orgId: string
}

export const BoardCard = (props: BoardCardProps) => {
    const { userId } = useAuth()

    const authorLabel = userId === props.authorId ? "あなた" : props.authorName
    const createAtLabel = formatDistanceToNow(props.createdAt, {
        addSuffix: true,
    })

    const getFavorites = useQuery(api.board.getFavorites, { boardId: props.boardId, orgId: props.orgId })

    let isFavorite = false
    if (getFavorites !== undefined) {
        isFavorite = getFavorites.some((favorite) => favorite.userId === userId)
    }

    const { mutate, pending } = useApiMutation(api.board.favorite);

    const toggleFavorite = () => {
        mutate({ boardId: props.boardId, orgId: props.orgId })
            .then(() => {
                isFavorite = !isFavorite
            })
    }

    return (
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <Link href={`/board/${props.boardId}`} className="relative flex-1 bg-amber-50">
                <Image
                    src={props.imageUrl}
                    alt={props.title}
                    fill
                    className="object-fit p-5"
                />
                <Overlay />
                <Actions
                    boardId={props.boardId}
                    title={props.title}
                    side="right" >
                    <button className="absolute top-2 right-2 outline-none">
                        <MoreHorizontal className="text-white hover:bg-slate-100 hover:text-gray-900 transition-opacity rounded-sm" />
                    </button>
                </Actions>
            </Link>
            <Footer
                isFavorite={isFavorite}
                title={props.title}
                authorLabel={authorLabel}
                createdAtLabel={createAtLabel}
                orgId={props.orgId}
                onClick={toggleFavorite}
                disable={pending} />
        </div>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}